// https://www.hacksparrow.com/nodejs/tcp-socket-programming-in-node-js.html
// https://www.knowledgehut.com/tutorials/node-js/socket-services
// https://millermedeiros.github.io/mdoc/examples/node_api/doc/net.html

var net = require('net');
const moment = require('moment');
import {exportToExcel} from './railScale';

let mesObj = {
    devName: '',
    params: [] /* array of objects{type: '2B', obj:{'key': value} } get from JSON */ 
}

class parsedString {
    str: string;
    nextIndex: number;
    // constructor(str: string, nextIndex: number) {
    //     this.str = str; this.nextIndex = nextIndex;
    // };
}

function getLongInt(data, pString: parsedString): number {
    //console.log(data[pString.nextIndex]);
    let val = data[pString.nextIndex++] << 24;
    //console.log(data[pString.nextIndex]);
    val += data[pString.nextIndex++] << 16;
    //console.log(data[pString.nextIndex]);
    val += data[pString.nextIndex++] << 8;
    //console.log(data[pString.nextIndex]);
    val += data[pString.nextIndex++];
    return val;
}

function parseString(data, beginIndex): parsedString {
    let res = {str: '', nextIndex: 0};
    let maxLength = data[beginIndex++];
    let length = data[beginIndex++];  //console.log(`length = ${length}`)
    if(maxLength & 0x1) maxLength++;  //console.log(`maxLength = ${maxLength}`)
    for(let i = beginIndex; i < length + beginIndex; i++) res.str += String.fromCharCode(data[i]);
    res.nextIndex = beginIndex + maxLength;
    //console.log(`res.str = ${res.str}`);
    //console.log(`res.nextIndex = ${res.nextIndex}`);
    //for(let i = beginIndex; i < beginIndex + 6; i++) console.log(`...${data[i]}... ${String.fromCharCode(data[i])}`)
    return res;
}

function parseCPUmessage(data){


    //console.log(JSON.stringify(data, null, 4))

    mesObj.params = []; //mesObj.params = {};
    let curObj = {type: '', names: [], values: [], obj: {} };
    let pString: parsedString = parseString(data, 0);
    mesObj.devName = pString.str;
    while( pString.nextIndex < data.length ) {
        curObj = {type: '', names: [], values: [], obj: {} };
        pString = parseString(data, pString.nextIndex);
        curObj.names = pString.str.split(";");
        curObj.type = curObj.names.splice(0, 1)[0];
        //console.log(`curObj.type = ${curObj.type[1]}`);
        //console.log(`nextIndex ====== ${pString.nextIndex}`)
        if(curObj.type == '2B'){
            curObj.values[0] = data[pString.nextIndex++];
            curObj.values[0] += data[pString.nextIndex++] << 8;
            for(let i = 0; i < curObj.names.length; i++){
                if( curObj.names[i] != '' )
                    curObj.obj[curObj.names[i]] = ( curObj.values[0] & (0x1 << i) ) ? (true) : (false); 
            }
            //console.log(` pString.nextIndex = ${pString.nextIndex}`)
        }
        else if(curObj.type[1] == 'I'){     // long integer
            let count = parseInt(curObj.type[0]); 
            //console.log(`count:${count} and names length:${curObj.names.length}`);
            if(count != curObj.names.length) return;
            for(let i = 0; i < curObj.names.length; i++){
                // //console.log(data[pString.nextIndex]);
                // let val = data[pString.nextIndex++] << 24;
                // //console.log(data[pString.nextIndex]);
                // val += data[pString.nextIndex++] << 16;
                // //console.log(data[pString.nextIndex]);
                // val += data[pString.nextIndex++] << 8;
                // //console.log(data[pString.nextIndex]);
                // val += data[pString.nextIndex++];
                // curObj.obj[curObj.names[i]] = val ;
                curObj.obj[curObj.names[i]] = getLongInt(data, pString) ;
            }    
        }
        else if(curObj.type[1] == 'b'){ // byte
            let count = parseInt(curObj.type[0]);
            if(count != curObj.names.length) return;
            for(let i = 0; i < curObj.names.length; i++){
                //console.log(data[pString.nextIndex]);
                curObj.obj[curObj.names[i]] = data[pString.nextIndex++];
            }    
        }
        else if(curObj.type[1] == 'i'){ // int
            let count = parseInt(curObj.type[0]);
            if(count != curObj.names.length) return;
            for(let i = 0; i < curObj.names.length; i++){
                let val = data[pString.nextIndex++] << 8;
                val += data[pString.nextIndex++];
                curObj.obj[curObj.names[i]] = val;
            }    
        }
        else if(curObj.type[1] == 'A'){     // array
            let elSize = parseInt(curObj.type[0]);    // size of element
            let arrSize = data[pString.nextIndex++];
            pString.nextIndex++;
            let arr = [];
            for(let i = 0; i < arrSize; i++) {
                //console.log(`i:${i}`)
                arr.push( elSize==4 ? getLongInt(data, pString) : null);
            }
//curObj.names[0]
            curObj.obj['array'] = arr;
        } 
        else{ /*console.log("aaaaa");*/ return; }
        delete curObj.names;
        delete curObj.values;
        //console.log(`next index======>>>${pString.nextIndex}`)
//console.log(JSON.stringify(curObj, null, 4))

        mesObj.params.push(curObj);
    }
    //console.log( JSON.stringify(mesObj, null, 4) );
    return mesObj;
}

function parseObject(obj){
    let res = {};
    for(let i = 0; i < obj.params.length; i++){
        Object.getOwnPropertyNames(obj.params[i].obj).forEach(function(val){
            res[val] = obj.params[i].obj[val];
        });
    }
    return res;     //console.log(JSON.stringify(res, null, 4));
}

function objectsDif(previous, current){
    let res = {}
    let dif = false;
    Object.getOwnPropertyNames(current).forEach(function(propName){
        if(current[propName] != previous[propName]){
            res[propName] = current[propName];
            dif = true;
        }
    });
    if(dif) return res;
    return null;
}
/******************************************************************    
 *                             CLIENT                             *
 ******************************************************************/

var PORT = 2000;

let allClients = [
    // {host: '192.168.100.50', name: 'DSF'},   // ok
    // {host: '192.168.100.103', name: 'Cage'}, //192.168.100.51
    // {host: '192.168.100.52', name: 'Skip'},
    // {host: '192.168.100.53', name: 'SubStation'},
    // {host: '192.168.100.54', name: 'UndegroundStation'},
    // {host: '192.168.100.55', name: 'Batcher'},   // ok
    // {host: '192.168.100.56', name: 'Compressor'},
    // /*   Conveyor scale   */
    // {host: '192.168.100.60', name: 'Scale3AB'},
    // {host: '192.168.100.62', name: 'Scale4'},
    // {host: '192.168.100.64', name: 'Scale6AB'},
    // {host: '192.168.100.66', name: 'Scale7'},
    {host: '192.168.100.68', name: 'Scale8_9'},
    // /*   Pumps   */
    // {host: '192.168.100.40', name: 'techPumps'},
    // {host: '192.168.100.41', name: 'clearPumps'},
    // {host: '192.168.100.43', name: 'drainageA'},
    // {host: '192.168.100.45', name: 'drainageB'},
    // //{host: '192.168.100.70', name: 'RailScale'},
    
    // {host: '192.168.100.103', name: 'BatcherLable'}
];

enum socketState {
    Created = 0,
    TryConnect,
    Connected,
    Sending,
    ConnectErr,
    SendErr
}

class ClientSocket {
    socket: any;
    host:   string;
    state:  socketState;
    name:   string;
    obj:    any;
    timeOut: number;
    constructor(index: number){
        this.socket = new net.Socket();
        this.host = allClients[index].host;
        this.state = socketState.Created;
        this.name = allClients[index].name;
        this.obj = null;
        this.timeOut = 0;
    }
}

let clients: ClientSocket[] = new Array(allClients.length);

function showTest(index){
    return;
    let t = (new Date()).toLocaleTimeString();
    console.log(`index=${index}; 
    state=${clients[index].state}; \n local time: ${t}`);
}


export function stopConnection(){
    //client.destroy(); 
    for(let i = 0; i < clients.length; i++){
        // console.log(`socket ${clients[i].socket.remoteAddress} destroy`)
        clients[i].socket.destroy();
        clients[i].state = socketState.Created;
    }
    //startClient();
}

function getMesFromUint8Array(u8){
    let mes = '';
    if(u8[0] == 0 && u8[1] == 0){
        for(let i = 2; i < u8.length; i++) mes += String.fromCharCode(u8[i]);
    }
    return mes;
}

const MAX_TIME_OUT = 60;

class DriveClients  {
    clients: ClientSocket[] = new Array(allClients.length);
    current: number = 0;    // index of current client
    clientsCount: number = allClients.length;
    timer: any;
    showDif: boolean;
    callBack: any = null;  // call back function (schemeName, mes{key: val, ...})
    constructor(){
        this.clients = new Array(allClients.length);
        this.current = 0;
        this.clientsCount = allClients.length;  //console.log(`allClients.length ${allClients.length}`);
        this.showDif = false;//true;
        for(let i = 0; i < this.clientsCount; i++){
            // console.log(` i = ${i}; create  ${allClients[i].name}`);
            this.clients[i] = new ClientSocket(i);      
        } 
        //this.timer = setInterval(this.drive, 1000);
    }
    checkObj(obj, index){
//        console.log(`get object index=${index} name=${allClients[index].name}`)
        let newObj = parseObject(obj);
        //exportToExcel(newObj);
        if(this.clients[index].obj != null){
            let dif = objectsDif(this.clients[index].obj, newObj);
            if(dif != null && this.showDif) 
                console.log(`${obj.devName} `,moment().format("DD MMM YYYY HH:mm:ss"), JSON.stringify(dif, null, 4));
        }
        this.clients[index].obj = newObj;
        if(!this.showDif) console.log(`${obj.devName} `,moment().format("DD MMM YYYY HH:mm:ss"), JSON.stringify(newObj, null, 4)); 
        if(this.callBack != null) this.callBack(obj.devName, newObj);
        this.showDif = true; 
    }
    connect(/*plc index*/ index: number){
        //console.log(`connectPlc ${allClients[index].name}`);
        //return;
        let cl = this.clients[index]; //let cl = this.clients[index].socket;
        let hs = this.clients[index].host;  // console.log(this.clients[index]);
        cl.state = socketState.TryConnect;  //this.clients[index].state = socketState.TryConnect;
        cl.socket.connect( PORT, hs /*HOST*/, () => { 
            console.log(`client connected to remote address ===> ${cl.socket.remoteAddress}`);
            cl.state = socketState.Connected; 
            cl.timeOut = MAX_TIME_OUT;
        }); 
        cl.socket.on('data', (data) => {     
            let ar = new Uint8Array(data);
//            console.log(`${moment().format("DD MMM YYYY HH:mm:ss")} ${cl.name}(${cl.socket.remoteAddress})`); 
            cl.state = socketState.Connected; //clients[index].state = socketState.Connected;
            cl.timeOut = 0;
            if(ar[0] == 0 && ar[1] == 0){
                let mes = '';
                mes = getMesFromUint8Array( ar );
                console.log(mes);
                return;
            }
            let obj = parseCPUmessage(ar);  //showTest(index);
            //console.log(JSON.stringify(obj, null, 4))
            this.checkObj(obj, index);
        });
        cl.socket.on('close', () => {
            console.log(`Client ${cl.name} closed ==> ${cl.host} ${cl.socket.remoteAddress}`); 
            if(cl.state != socketState.ConnectErr && cl.state != socketState.SendErr){
                cl.state =  cl.state == socketState.Sending ? socketState.SendErr : socketState.ConnectErr;
            }
        });  
        cl.socket.on('error', (err) => { 
            console.error(err); 
            console.log(`Client ${cl.name} closed ==> ${cl.host} ${cl.socket.remoteAddress}`); 
            cl.state =  cl.state == socketState.Sending ? socketState.SendErr : socketState.ConnectErr;            
        });     
    
    }
    getPlcData(/*plc index*/ i: number){
        //console.log(`getPlcData ${allClients[i].name}`);
        this.clients[i].state = socketState.Sending;
        this.clients[i].socket.write(new Uint8Array([1,2]));
    }
    async recreate(i: number){
        try{ 
            await this.clients[i].socket.destroy();
        }catch{}
        this.clients[i].socket = new net.Socket(); //new ClientSocket(i)
        this.clients[i].state = socketState.Created;
    }
    create(i: number){

    }
    reloadPlc(/*plc index*/ i: number){
        // console.log(`reloadPlc ${allClients[i].name}`);
        driveClients.showDif = false;
        this.clients[i].state = socketState.Sending;
        this.clients[i].socket.write(new Uint8Array([2,3]));
    }
    showState(i: number){
        let st = driveClients.clients[driveClients.current].state;  
        if(st == socketState.Created) return 'Created';
        else if (st == socketState.TryConnect) return 'try to connect';
        else if (st == socketState.Connected) return 'Connected';
        else if (st == socketState.Sending) return 'Sending';
        else if (st == socketState.ConnectErr) return 'ConnectErr';
        return 'SendErr';
    }
    drive(){
        
        //driveClients.current = 0;


        //console.log(`driveClients.current = ${driveClients.current}`)
        let name = driveClients.clients[driveClients.current].name;
        let mes = `${name} before state: ${driveClients.showState(driveClients.current)}`;
        switch( driveClients.clients[driveClients.current].state ){
            case socketState.Created:       
                driveClients.connect(driveClients.current);     // next state TryConnect
                driveClients.showDif = false;
                break;
            case socketState.TryConnect:    // if connect-> Connected else -> ConnectErr
                console.log('Wait to connect');
                break;
            case socketState.Connected:
                driveClients.clients[driveClients.current].timeOut += 1;
                if(driveClients.clients[driveClients.current].timeOut >= MAX_TIME_OUT){
                    driveClients.clients[driveClients.current].timeOut = 0;
                    driveClients.showDif = false; 
                    driveClients.getPlcData(driveClients.current);     
                }
                break;
            case socketState.Sending:
                console.log('Wait to finish sending');
                break;
            case socketState.ConnectErr: case socketState.SendErr: 
                driveClients.recreate(driveClients.current);
                break;
        }
        if(driveClients.clients[driveClients.current].state != socketState.Connected)
            console.log(`${mes}; after state: ${driveClients.showState(driveClients.current)}\n`);
        //return;
        if(driveClients.current >= driveClients.clientsCount - 1) driveClients.current = 0;
        else driveClients.current += 1;
        
    }
}

let driveClients: DriveClients;

let testIndex = 0;

export function startClients(func: any){
    driveClients = new DriveClients();
    driveClients.callBack = func;
    //driveClients.timer = setInterval(driveClients.drive, 1000);
}


export function _testConnect(ind: number = -1){             // Connect
    driveClients.connect(testIndex);
    driveClients.showDif = false;
}


export function _testSend(showAll: boolean){
    if(showAll) driveClients.showDif = false;
    driveClients.getPlcData(testIndex);
}

export function _reCreate(){
    // console.log(`driveClients.recreate(testIndex = ${testIndex})`);
    driveClients.recreate(testIndex);
}



export function _sendReload(){
    driveClients.reloadPlc(testIndex);
}


export function _step(){driveClients.drive();}

let proxySocket: any = null;
async function recreateProxy(hosIp: string) {
    if(proxySocket != null){
        try{
            await proxySocket.destroy();
        }catch(_){}
        proxySocket = null;
    }
    proxySocket = new net.Socket();
    proxySocket.connect(2001, '192.168.100.103', ()=>{
        
    });
}
export  function connectToProxy(ipToConnect: string): boolean{
console.log(`ipToConnnect = ${ipToConnect}`)
    recreateProxy(ipToConnect);
    return true;
}

// function connectSocket(index){
//     let cl = clients[index].socket;
//     let hs = clients[index].host;  
//     clients[index].state = socketState.TryConnect;
//     cl.connect( PORT, hs /*HOST*/, () => { 
//         //console.log(`client connected to ${hs}:${PORT}`); 
//         console.log(`client connected to remote address ===> ${cl.remoteAddress}`);
//         clients[index].state = socketState.Connected;
//         //client.write(‘Hello, I am ${client.address().address}’); 
//         showTest(index);
//     }); 
//     cl.on('data', (data) => {     
//         let ar = new Uint8Array(data);
//         console.log(`Client received length: ${ar.length }`); 
//         clients[index].state = socketState.Connected;
//         parseCPUmessage(ar);
//         showTest(index);
//     });
//     cl.on('close', () => {
//         console.log(`Client closed ==> ${clients[index].host} ${cl.remoteAddress}`); 
//         clients[index].state = socketState.Created;

//         showTest(index);
//     });  
//     cl.on('error', (err) => { 
//         console.error(err); 
//         showTest(index);
//     });     
// }


/******************************************************************    
 *                             SERVER                             *
 ******************************************************************/
 let _sock;


 // Create a server instance, and chain the listen function to it
 // The function passed to net.createServer() becomes the event handler for the 'connection' event
 // The sock object the callback function receives UNIQUE for each connection
 
 // net.createServer(function(sock) {
 //     // We have a connection - a socket object is assigned to the connection automatically
 //    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
 //     _sock = sock;
 
 //     // Add a 'data' event handler to this instance of socket
 //     sock.on('data', function(data) {
 //       console.log('DATA ' + sock.remoteAddress + ': ' + data);
 //       // Write the data back to the socket, the client will receive it as data from the server
 //       sock.write('You said "' + data + '"');
 //     });
 //     // Add a 'close' event handler to this instance of socket
 //    sock.on('close', function(data) {
 //      console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
 //    });
   
 //   }).listen(PORT, HOST);
   
 //   console.log('Server listening on ' + HOST +':'+ PORT);
 
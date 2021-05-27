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
        else{ console.log("aaaaa"); return; }
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
    {host: '192.168.100.50', name: 'DSF'},
    // {host: '192.168.100.51', name: 'Cage'},
    // {host: '192.168.100.52', name: 'Skip'},
    // {host: '192.168.100.53', name: 'SubStation'},
    // {host: '192.168.100.54', name: 'UndegroundStation'},
    // {host: '192.168.100.55', name: 'Batcher'},
    // /*   Conveyor scale   */
    // {host: '192.168.100.60', name: 'Scale3AB'},
    // {host: '192.168.100.62', name: 'Scale4'},
    // {host: '192.168.100.64', name: 'Scale6AB'},
    // {host: '192.168.100.66', name: 'Scale7'},
    // {host: '192.168.100.68', name: 'Scale8_9'},
    /*   Pumps   */
    //{host: '192.168.100.40', name: 'techPumps'},
    // {host: '192.168.100.41', name: 'clearPumps'},
    // {host: '192.168.100.43', name: 'drainageA'},
    // {host: '192.168.100.45', name: 'drainageB'},
    //{host: '192.168.100.70', name: 'RailScale'}
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
    constructor(index: number){
        this.socket = new net.Socket();
        this.host = allClients[index].host;
        this.state = socketState.Created;
        this.name = allClients[index].name;
        this.obj = null;
    }
}

let clients: ClientSocket[] = new Array(allClients.length);

function showTest(index){
    return;
    let t = (new Date()).toLocaleTimeString();
    console.log(`index=${index}; 
    state=${clients[index].state}; \n local time: ${t}`);
}

export function startClient(){
    return;

    // for(let i = 0; i < allClients.length; i++){
    //     clients[i] = new ClientSocket(i);
    //     connectSocket(i);
    // }
    // return;

}

export function stopConnection(){
    //client.destroy(); 
    for(let i = 0; i < clients.length; i++){
        console.log(`socket ${clients[i].socket.remoteAddress} destroy`)
        clients[i].socket.destroy();
        clients[i].state = socketState.Created;
    }
    startClient();
}


class DriveClients  {
    clients: ClientSocket[] = new Array(allClients.length);
    current: number = 0;    // index of current client
    clientsCount: number = allClients.length;
    timer: any;
    showDif: boolean;
    constructor(){
        this.clients = new Array(allClients.length);
        this.current = 0;
        this.clientsCount = allClients.length;  //console.log(`allClients.length ${allClients.length}`);
        this.showDif = false;//true;
        for(let i = 0; i < this.clientsCount; i++){
            console.log(` i = ${i}; create  ${allClients[i].name}`);
            this.clients[i] = new ClientSocket(i);      
        } 
        //this.timer = setInterval(this.drive, 10000);
    }
    checkObj(obj, index){
        console.log(`get object index=${index} name=${allClients[index].name}`)
        let newObj = parseObject(obj);
        //exportToExcel(newObj);
        if(this.clients[index].obj != null){
            let dif = objectsDif(this.clients[index].obj, newObj);
            if(dif != null && this.showDif) console.log(JSON.stringify(dif, null, 4));
        }
        this.clients[index].obj = newObj;
        if(!this.showDif) console.log(JSON.stringify(newObj, null, 4));
        //this.showDif = true; 
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
        }); 
        cl.socket.on('data', (data) => {     
            let ar = new Uint8Array(data);
            console.log(`${moment().format("DD MMM YYYY HH:mm:ss")} ${cl.name}(${cl.socket.remoteAddress})`); 
            cl.state = socketState.Connected; //clients[index].state = socketState.Connected;
            let obj = parseCPUmessage(ar);  //showTest(index);
            //console.log(JSON.stringify(obj, null, 4))
            this.checkObj(obj, index);
        });
        cl.socket.on('close', () => {
            console.log(`Client closed ==> ${cl.host} ${cl.socket.remoteAddress}`); 
            if(cl.state != socketState.ConnectErr && cl.state != socketState.SendErr){
                cl.state =  cl.state == socketState.Sending ? socketState.SendErr : socketState.ConnectErr;
            }
        });  
        cl.socket.on('error', (err) => { 
            console.error(err); 
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
        console.log(`reloadPlc ${allClients[i].name}`);
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
        let mes = `before state: ${this.showState(driveClients.current)}`;
        switch( driveClients.clients[driveClients.current].state ){
            case socketState.Created:   driveClients.connect(driveClients.current); break;
            case socketState.TryConnect: 
                console.log('Wait to connect');
                break;
            case socketState.Connected: 
                driveClients.getPlcData(driveClients.current); break;
            case socketState.Sending:
                console.log('Wait to finish sending');
                break;
            case socketState.ConnectErr: case socketState.SendErr: 
                driveClients.recreate(driveClients.current);
                break;
        }
        console.log(`${mes}; after state: ${this.showState(driveClients.current)}`);
        return;
        if(driveClients.current >= driveClients.clientsCount - 1) driveClients.current = 0;
        else driveClients.current += 1;
        
    }
}

let driveClients = new DriveClients();

let testIndex = 0;

export function _testConnect(){
    driveClients.connect(testIndex);
    driveClients.showDif = false;
}


export function _testSend(showAll: boolean){
    if(showAll) driveClients.showDif = false;
    driveClients.getPlcData(testIndex);
    return;
//     let s = new Uint8Array([1,2]);    // let s = new Uint8Array(1);
//         // s[0] = 2;
//     //console.log(JSON.stringify(s))
//     //client.write('sa');
//     console.log('TEST SEND BEGIN')
    
//     for(let i = 0; i < clients.length; i++){
//         showTest(i);
//         if( clients[i].state == socketState.Connected ){
//             // console.log('before SEND')
//             // showTest(i);
//             clients[i].state = socketState.Sending;
//             clients[i].socket.write(s);
//             // console.log('after send')
//             // showTest(i);
//         }
//         else connectSocket(i);
//     }
//     //console.log('TEST SEND END')
//     return;
//     //client.write(s);
}

export function _sendReload(){
    driveClients.reloadPlc(testIndex);

    // let s = new Uint8Array([2,3]);
    // for(let i = 0; i < clients.length; i++){
    //     showTest(i);
    //     if( clients[i].state == socketState.Connected ){
    //         // console.log('before SEND')
    //         // showTest(i);
    //         clients[i].state = socketState.Sending;
    //         clients[i].socket.write(s);
    //         // console.log('after send')
    //         // showTest(i);
    //     }
    //     // else connectSocket(i);
    // }
}

export function _reCreate(){
    console.log(`driveClients.recreate(testIndex = ${testIndex})`);
    driveClients.recreate(testIndex);
}

export function _step(){driveClients.drive();}

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
 
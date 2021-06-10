"use strict";
// https://www.hacksparrow.com/nodejs/tcp-socket-programming-in-node-js.html
// https://www.knowledgehut.com/tutorials/node-js/socket-services
// https://millermedeiros.github.io/mdoc/examples/node_api/doc/net.html
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._step = exports._reCreate = exports._sendReload = exports._testSend = exports._testConnect = exports.startClients = exports.stopConnection = void 0;
var net = require('net');
var moment = require('moment');
var mesObj = {
    devName: '',
    params: [] /* array of objects{type: '2B', obj:{'key': value} } get from JSON */
};
var parsedString = /** @class */ (function () {
    function parsedString() {
    }
    return parsedString;
}());
function getLongInt(data, pString) {
    //console.log(data[pString.nextIndex]);
    var val = data[pString.nextIndex++] << 24;
    //console.log(data[pString.nextIndex]);
    val += data[pString.nextIndex++] << 16;
    //console.log(data[pString.nextIndex]);
    val += data[pString.nextIndex++] << 8;
    //console.log(data[pString.nextIndex]);
    val += data[pString.nextIndex++];
    return val;
}
function parseString(data, beginIndex) {
    var res = { str: '', nextIndex: 0 };
    var maxLength = data[beginIndex++];
    var length = data[beginIndex++]; //console.log(`length = ${length}`)
    if (maxLength & 0x1)
        maxLength++; //console.log(`maxLength = ${maxLength}`)
    for (var i = beginIndex; i < length + beginIndex; i++)
        res.str += String.fromCharCode(data[i]);
    res.nextIndex = beginIndex + maxLength;
    //console.log(`res.str = ${res.str}`);
    //console.log(`res.nextIndex = ${res.nextIndex}`);
    //for(let i = beginIndex; i < beginIndex + 6; i++) console.log(`...${data[i]}... ${String.fromCharCode(data[i])}`)
    return res;
}
function parseCPUmessage(data) {
    //console.log(JSON.stringify(data, null, 4))
    mesObj.params = []; //mesObj.params = {};
    var curObj = { type: '', names: [], values: [], obj: {} };
    var pString = parseString(data, 0);
    mesObj.devName = pString.str;
    while (pString.nextIndex < data.length) {
        curObj = { type: '', names: [], values: [], obj: {} };
        pString = parseString(data, pString.nextIndex);
        curObj.names = pString.str.split(";");
        curObj.type = curObj.names.splice(0, 1)[0];
        //console.log(`curObj.type = ${curObj.type[1]}`);
        //console.log(`nextIndex ====== ${pString.nextIndex}`)
        if (curObj.type == '2B') {
            curObj.values[0] = data[pString.nextIndex++];
            curObj.values[0] += data[pString.nextIndex++] << 8;
            for (var i = 0; i < curObj.names.length; i++) {
                if (curObj.names[i] != '')
                    curObj.obj[curObj.names[i]] = (curObj.values[0] & (0x1 << i)) ? (true) : (false);
            }
            //console.log(` pString.nextIndex = ${pString.nextIndex}`)
        }
        else if (curObj.type[1] == 'I') { // long integer
            var count = parseInt(curObj.type[0]);
            //console.log(`count:${count} and names length:${curObj.names.length}`);
            if (count != curObj.names.length)
                return;
            for (var i = 0; i < curObj.names.length; i++) {
                // //console.log(data[pString.nextIndex]);
                // let val = data[pString.nextIndex++] << 24;
                // //console.log(data[pString.nextIndex]);
                // val += data[pString.nextIndex++] << 16;
                // //console.log(data[pString.nextIndex]);
                // val += data[pString.nextIndex++] << 8;
                // //console.log(data[pString.nextIndex]);
                // val += data[pString.nextIndex++];
                // curObj.obj[curObj.names[i]] = val ;
                curObj.obj[curObj.names[i]] = getLongInt(data, pString);
            }
        }
        else if (curObj.type[1] == 'b') { // byte
            var count = parseInt(curObj.type[0]);
            if (count != curObj.names.length)
                return;
            for (var i = 0; i < curObj.names.length; i++) {
                //console.log(data[pString.nextIndex]);
                curObj.obj[curObj.names[i]] = data[pString.nextIndex++];
            }
        }
        else if (curObj.type[1] == 'i') { // int
            var count = parseInt(curObj.type[0]);
            if (count != curObj.names.length)
                return;
            for (var i = 0; i < curObj.names.length; i++) {
                var val = data[pString.nextIndex++] << 8;
                val += data[pString.nextIndex++];
                curObj.obj[curObj.names[i]] = val;
            }
        }
        else if (curObj.type[1] == 'A') { // array
            var elSize = parseInt(curObj.type[0]); // size of element
            var arrSize = data[pString.nextIndex++];
            pString.nextIndex++;
            var arr = [];
            for (var i = 0; i < arrSize; i++) {
                //console.log(`i:${i}`)
                arr.push(elSize == 4 ? getLongInt(data, pString) : null);
            }
            //curObj.names[0]
            curObj.obj['array'] = arr;
        }
        else {
            console.log("aaaaa");
            return;
        }
        delete curObj.names;
        delete curObj.values;
        //console.log(`next index======>>>${pString.nextIndex}`)
        //console.log(JSON.stringify(curObj, null, 4))
        mesObj.params.push(curObj);
    }
    //console.log( JSON.stringify(mesObj, null, 4) );
    return mesObj;
}
function parseObject(obj) {
    var res = {};
    var _loop_1 = function (i) {
        Object.getOwnPropertyNames(obj.params[i].obj).forEach(function (val) {
            res[val] = obj.params[i].obj[val];
        });
    };
    for (var i = 0; i < obj.params.length; i++) {
        _loop_1(i);
    }
    return res; //console.log(JSON.stringify(res, null, 4));
}
function objectsDif(previous, current) {
    var res = {};
    var dif = false;
    Object.getOwnPropertyNames(current).forEach(function (propName) {
        if (current[propName] != previous[propName]) {
            res[propName] = current[propName];
            dif = true;
        }
    });
    if (dif)
        return res;
    return null;
}
/******************************************************************
 *                             CLIENT                             *
 ******************************************************************/
var PORT = 2000;
var allClients = [
    // {host: '192.168.100.50', name: 'DSF'},   // ok
    // {host: '192.168.100.51', name: 'Cage'},
    //  {host: '192.168.100.52', name: 'Skip'},
    // {host: '192.168.100.53', name: 'SubStation'},
    // {host: '192.168.100.54', name: 'UndegroundStation'},
    //{host: '192.168.100.55', name: 'Batcher'},   // ok
    // /*   Conveyor scale   */
    // {host: '192.168.100.60', name: 'Scale3AB'},
    // {host: '192.168.100.62', name: 'Scale4'},
    // {host: '192.168.100.64', name: 'Scale6AB'},
    // {host: '192.168.100.66', name: 'Scale7'},
    // {host: '192.168.100.68', name: 'Scale8_9'},
    /*   Pumps   */
    //{host: '192.168.100.40', name: 'techPumps'},
    // {host: '192.168.100.41', name: 'clearPumps'},
    //{host: '192.168.100.43', name: 'drainageA'},
    // {host: '192.168.100.45', name: 'drainageB'},
    //{host: '192.168.100.70', name: 'RailScale'},
    { host: '192.168.100.103', name: 'BatcherLable' }
];
var socketState;
(function (socketState) {
    socketState[socketState["Created"] = 0] = "Created";
    socketState[socketState["TryConnect"] = 1] = "TryConnect";
    socketState[socketState["Connected"] = 2] = "Connected";
    socketState[socketState["Sending"] = 3] = "Sending";
    socketState[socketState["ConnectErr"] = 4] = "ConnectErr";
    socketState[socketState["SendErr"] = 5] = "SendErr";
})(socketState || (socketState = {}));
var ClientSocket = /** @class */ (function () {
    function ClientSocket(index) {
        this.socket = new net.Socket();
        this.host = allClients[index].host;
        this.state = socketState.Created;
        this.name = allClients[index].name;
        this.obj = null;
    }
    return ClientSocket;
}());
var clients = new Array(allClients.length);
function showTest(index) {
    return;
    var t = (new Date()).toLocaleTimeString();
    console.log("index=" + index + "; \n    state=" + clients[index].state + "; \n local time: " + t);
}
function stopConnection() {
    //client.destroy(); 
    for (var i = 0; i < clients.length; i++) {
        console.log("socket " + clients[i].socket.remoteAddress + " destroy");
        clients[i].socket.destroy();
        clients[i].state = socketState.Created;
    }
    //startClient();
}
exports.stopConnection = stopConnection;
var DriveClients = /** @class */ (function () {
    function DriveClients() {
        this.clients = new Array(allClients.length);
        this.current = 0; // index of current client
        this.clientsCount = allClients.length;
        this.callBack = null; // call back function (schemeName, mes{key: val, ...})
        this.clients = new Array(allClients.length);
        this.current = 0;
        this.clientsCount = allClients.length; //console.log(`allClients.length ${allClients.length}`);
        this.showDif = false; //true;
        for (var i = 0; i < this.clientsCount; i++) {
            console.log(" i = " + i + "; create  " + allClients[i].name);
            this.clients[i] = new ClientSocket(i);
        }
        //this.timer = setInterval(this.drive, 10000);
    }
    DriveClients.prototype.checkObj = function (obj, index) {
        //        console.log(`get object index=${index} name=${allClients[index].name}`)
        var newObj = parseObject(obj);
        //exportToExcel(newObj);
        if (this.clients[index].obj != null) {
            var dif = objectsDif(this.clients[index].obj, newObj);
            if (dif != null && this.showDif)
                console.log(moment().format("DD MMM YYYY HH:mm:ss"), JSON.stringify(dif, null, 4));
        }
        this.clients[index].obj = newObj;
        if (!this.showDif)
            console.log(moment().format("DD MMM YYYY HH:mm:ss"), JSON.stringify(newObj, null, 4));
        if (this.callBack != null)
            this.callBack(obj.devName, newObj);
        this.showDif = true;
    };
    DriveClients.prototype.connect = function (/*plc index*/ index) {
        var _this = this;
        //console.log(`connectPlc ${allClients[index].name}`);
        //return;
        var cl = this.clients[index]; //let cl = this.clients[index].socket;
        var hs = this.clients[index].host; // console.log(this.clients[index]);
        cl.state = socketState.TryConnect; //this.clients[index].state = socketState.TryConnect;
        cl.socket.connect(PORT, hs /*HOST*/, function () {
            console.log("client connected to remote address ===> " + cl.socket.remoteAddress);
            cl.state = socketState.Connected;
        });
        cl.socket.on('data', function (data) {
            var ar = new Uint8Array(data);
            //            console.log(`${moment().format("DD MMM YYYY HH:mm:ss")} ${cl.name}(${cl.socket.remoteAddress})`); 
            cl.state = socketState.Connected; //clients[index].state = socketState.Connected;
            var obj = parseCPUmessage(ar); //showTest(index);
            //console.log(JSON.stringify(obj, null, 4))
            _this.checkObj(obj, index);
        });
        cl.socket.on('close', function () {
            console.log("Client closed ==> " + cl.host + " " + cl.socket.remoteAddress);
            if (cl.state != socketState.ConnectErr && cl.state != socketState.SendErr) {
                cl.state = cl.state == socketState.Sending ? socketState.SendErr : socketState.ConnectErr;
            }
        });
        cl.socket.on('error', function (err) {
            console.error(err);
            cl.state = cl.state == socketState.Sending ? socketState.SendErr : socketState.ConnectErr;
        });
    };
    DriveClients.prototype.getPlcData = function (/*plc index*/ i) {
        //console.log(`getPlcData ${allClients[i].name}`);
        this.clients[i].state = socketState.Sending;
        this.clients[i].socket.write(new Uint8Array([1, 2]));
    };
    DriveClients.prototype.recreate = function (i) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.clients[i].socket.destroy()];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 3];
                    case 3:
                        this.clients[i].socket = new net.Socket(); //new ClientSocket(i)
                        this.clients[i].state = socketState.Created;
                        return [2 /*return*/];
                }
            });
        });
    };
    DriveClients.prototype.create = function (i) {
    };
    DriveClients.prototype.reloadPlc = function (/*plc index*/ i) {
        console.log("reloadPlc " + allClients[i].name);
        this.clients[i].state = socketState.Sending;
        this.clients[i].socket.write(new Uint8Array([2, 3]));
    };
    DriveClients.prototype.showState = function (i) {
        var st = driveClients.clients[driveClients.current].state;
        if (st == socketState.Created)
            return 'Created';
        else if (st == socketState.TryConnect)
            return 'try to connect';
        else if (st == socketState.Connected)
            return 'Connected';
        else if (st == socketState.Sending)
            return 'Sending';
        else if (st == socketState.ConnectErr)
            return 'ConnectErr';
        return 'SendErr';
    };
    DriveClients.prototype.drive = function () {
        //driveClients.current = 0;
        //console.log(`driveClients.current = ${driveClients.current}`)
        var mes = "before state: " + this.showState(driveClients.current);
        switch (driveClients.clients[driveClients.current].state) {
            case socketState.Created:
                driveClients.connect(driveClients.current);
                break;
            case socketState.TryConnect:
                console.log('Wait to connect');
                break;
            case socketState.Connected:
                driveClients.getPlcData(driveClients.current);
                break;
            case socketState.Sending:
                console.log('Wait to finish sending');
                break;
            case socketState.ConnectErr:
            case socketState.SendErr:
                driveClients.recreate(driveClients.current);
                break;
        }
        console.log(mes + "; after state: " + this.showState(driveClients.current));
        return;
        if (driveClients.current >= driveClients.clientsCount - 1)
            driveClients.current = 0;
        else
            driveClients.current += 1;
    };
    return DriveClients;
}());
var driveClients;
var testIndex = 0;
function startClients(func) {
    driveClients = new DriveClients();
    driveClients.callBack = func;
}
exports.startClients = startClients;
function _testConnect() {
    driveClients.connect(testIndex);
    driveClients.showDif = false;
}
exports._testConnect = _testConnect;
function _testSend(showAll) {
    if (showAll)
        driveClients.showDif = false;
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
exports._testSend = _testSend;
function _sendReload() {
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
exports._sendReload = _sendReload;
function _reCreate() {
    console.log("driveClients.recreate(testIndex = " + testIndex + ")");
    driveClients.recreate(testIndex);
}
exports._reCreate = _reCreate;
function _step() { driveClients.drive(); }
exports._step = _step;
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
var _sock;
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
//# sourceMappingURL=tcpipConnector.js.map
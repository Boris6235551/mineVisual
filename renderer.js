"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_js_1 = __importDefault(require("vue/dist/vue.js")); // вместо import Vue from 'vue'
var mine_drawing_1 = require("./mine_drawing");
var _dsf_1 = require("./_dsf");
var _skip_1 = require("./_skip");
var _batcher_1 = require("./_batcher");
var _undergroundsubstation_1 = require("./_undergroundsubstation");
var _cage_1 = require("./_cage");
var _undegroundPump_1 = require("./_undegroundPump");
var _batcherlable_1 = require("./_batcherlable");
var _receivinghopper_1 = require("./_receivinghopper");
var _substation_1 = require("./_substation");
var _compressor_1 = require("./_compressor");
var ipcRenderer = require('electron').ipcRenderer;
var BrowserWindow = require('electron').remote.BrowserWindow;
ipcRenderer.on('resended', function (event, arr) {
    console.log('resended');
});
var screenMain = new mine_drawing_1.Screen();
// // let techWater = new TechWater('container', window.innerWidth, window.innerHeight);
var cage = new _cage_1.CAGE('containerCage', window.innerWidth, window.innerHeight);
var UndegroundPump1 = new _undegroundPump_1.UNDEGROUNDPUMP('containerUndegroundPump1', window.innerWidth, window.innerHeight, new mine_drawing_1.Point(400, 100), 1);
var UndegroundPump2 = new _undegroundPump_1.UNDEGROUNDPUMP('containerUndegroundPump2', window.innerWidth, window.innerHeight, new mine_drawing_1.Point(400, 100), 2);
var SurfacePump1 = new _undegroundPump_1.SURFACEPUMP('containerSurfacePump1', window.innerWidth, window.innerHeight, new mine_drawing_1.Point(2545, 44));
var dsf = new _dsf_1.DSF('containerDSF', window.innerWidth, window.innerHeight);
var skip = new _skip_1.SKIP('containerSkip', window.innerWidth, window.innerHeight);
var batcher = new _batcher_1.BATCHER('batcher', window.innerWidth, window.innerHeight);
var substationUndeground = new _undergroundsubstation_1.UNDERGROUNDSUBSTATION('undergroundsubstation', window.innerWidth, window.innerHeight);
var batcherlable = new _batcherlable_1.BATCHERLABLE('batcherlable', window.innerWidth, window.innerHeight);
var receivingHopper = new _receivinghopper_1.RECEIVINGHOPPER('receivinghopper', window.innerWidth, window.innerHeight);
var substation = new _substation_1.SUBSTATION('substation', window.innerWidth, window.innerHeight);
var compressor = new _compressor_1.COMPRESSOR('compressor', window.innerWidth, window.innerHeight);
// screenMain.addScheme(techWater);
screenMain.addScheme(dsf);
screenMain.addScheme(skip);
screenMain.addScheme(batcher);
screenMain.addScheme(cage);
screenMain.addScheme(substationUndeground);
screenMain.addScheme(UndegroundPump1);
screenMain.addScheme(UndegroundPump2);
screenMain.addScheme(SurfacePump1);
screenMain.addScheme(batcherlable);
screenMain.addScheme(receivingHopper);
screenMain.addScheme(substation);
// screenMain.addScheme(undegroundpump);
screenMain.addScheme(compressor);
var tcpipConnector_1 = require("./tcpipConnector");
function sendMes(name, mes) {
    screenMain.resendMessage(name, mes);
}
tcpipConnector_1.startClients(sendMes);
// animateScheme(dsf, 500);
// animateScheme(batcher, 500);
// animateScheme(skip, 500);
// animateScheme(cage, 500);
// animateScheme(substationUndeground, 500);
// animateScheme(UndegroundPump1, 500);
// animateScheme(batcherlable, 500);
// animateScheme(receivingHopper, 500);
// animateScheme(substation, 500);
// animateScheme(compressor, 500);
// export default class MyComponent extends Vue {
//   // Данные инициализации могут быть объявлены как свойства экземпляра
//   message: string = 'Hello!'
//   // Методы компонента могут быть объявлены как методы экземпляра
//   onClick (): void {
//     window.alert(this.message)
//   }
// }
new vue_js_1.default({
    el: '#index_body',
    methods: {
        printReport: function () {
            var reportWin = new BrowserWindow({
                width: 800,
                height: 600,
                frame: false,
                webPreferences: {
                    nodeIntegration: true
                }
            });
            reportWin.loadFile('report.html');
            // reportWin.webContents.openDevTools();
        }
    }
});
// let surfaceScheme = new Scheme('containerFirst', window.innerWidth * 0.4, window.innerHeight);
// let surfaceScheme2 = new Scheme('containerSecond', window.innerWidth * 0.31, window.innerHeight);
// точка - начало линии шины компрессоров, втрое значение - длина линии шины компрессоров 
// let CompressorRoom1 = new CompressorRoom(new Point(200, 650), 300);
// surfaceScheme.addWidget(CompressorRoom1);
// let UndergroundSubstation1 = new UndergroundSubstation(new Point(30, 440), 1000)
// surfaceScheme.addWidget(UndergroundSubstation1);
// let UndergroundSubstationCells = [];
// for (let n: number = 0; n <= 10; n++) {
//     UndergroundSubstationCells[n] = new UndergroundSubstationCell(new Point(30, 440), 1000, n)
//     surfaceScheme.addWidget(UndergroundSubstationCells[n]);
// }
//UndergroundSubstationCells[0].setBaseProperty({ bit: true, byte: 1, word: 4 })
//UndergroundSubstationCells[1].setBaseProperty({ bit: false, byte: 1, word: 4 })
// let GroundHorizontalLine1 = new GroundHorizontalLine(new Point(30, 143), 720)
// surfaceScheme.addWidget(GroundHorizontalLine1);
// let GroundVerticalLine1 = new GroundVerticalLine(new Point(750, 143), 750)
// surfaceScheme.addWidget(GroundVerticalLine1);
// let Cage1 = new Cage(new Point(190, 50), 300)
// surfaceScheme.addWidget(Cage1);
// Cage1.setState(2)
// let Skip1 = new Skip(new Point(450, 50), 700)
// surfaceScheme.addWidget(Skip1);
// Skip1.setState(0)
//  valveY2.setState(ValveState.opened);
//  surfaceScheme.addWidget(valveY2);
//  valveY3.setState(ValveState.opened);
// surfaceScheme.addWidget(pool1);
// let line1 = new Connection(new Point(0,0), 100, Disposition.Vertical);
// line1.connectVertical(valveY1, valveY2);
// surfaceScheme.addWidget(line1);
// let OverheadSubstationTrunk1 = new OverheadSubstationTrunk(new Point(30, 120), 800)
// surfaceScheme2.addWidget(OverheadSubstationTrunk1);
// let OverheadSubstationCells = [];
// for (let n: number = 0; n <= 10; n++) {
//     OverheadSubstationCells[n] = new OverheadSubstationCell(new Point(30, 120), 800, n)
//     surfaceScheme2.addWidget(OverheadSubstationCells[n]);
// }
//OverheadSubstationCells[0].setBaseProperty({ bit: false, byte: 1, word: 4 })
//OverheadSubstationCells[1].setBaseProperty({ bit: false, byte: 1, word: 4 })
// точка - начало линии шины компрессоров, втрое значение - длина линии шины компрессоров 
// let CompressorRoom2 = new CompressorRoom(new Point(130, 300), 300);
// surfaceScheme2.addWidget(CompressorRoom2);
// animateScheme(surfaceScheme, 500);
// animateScheme(techWater, 500);
// animateScheme(dsf, 500);
// animateScheme(surfaceScheme, 2000);
// animateScheme(surfaceScheme2, 2000);
// let pumpM1_1 = new Pump(10, 10, Disposition.Horizontal);
// let valveY1 = new Valve(new Point(100, 100), 100, Disposition.Vertical, 20);
// surfaceScheme.addWidget(valveY1);
// let valveY2 = new Valve(new Point(100, 400), 90, Disposition.Horizontal, 80);
// surfaceScheme.addWidget(valveY2);
// let valveY3 = new Valve(new Point(400, 100), 250, Disposition.Horizontal, 20);
// surfaceScheme.addWidget(valveY3);
// let valveY4 = new Valve(new Point(400, 400), 250, Disposition.Vertical, 20);
// surfaceScheme.addWidget(valveY4);
// let valveY5 = new Valve(new Point(800, 100), 200, Disposition.Vertical, 20);
// surfaceScheme.addWidget(valveY5);
// let valveY6 = new Valve(new Point(800, 400), 200, Disposition.Horizontal, 20);
// surfaceScheme.addWidget(valveY6);
// let valveY7 = new Valve(new Point(300, 100), 100, Disposition.Vertical, 20);
// surfaceScheme.addWidget(valveY7);
// valveY7.setState(ValveState.opened);
// let valveY8 = new Valve(new Point(300, 400), 100, Disposition.Horizontal, 20);
// surfaceScheme.addWidget(valveY8);
// let Pump1 = new Pump(new Point(200, 100), 250, Disposition.Horizontal);
// surfaceScheme.addWidget(Pump1);
// Pump1.setState(PumpState.run)
// let Pump2 = new Pump(new Point(100, 100), 150, Disposition.Horizontal);
// surfaceScheme.addWidget(Pump2);
// Pump2.setState(PumpState.revers)
// let Pump3 = new Undegraund(new Point(100, 250), 150, Disposition.Vertical);
// surfaceScheme.addWidget(Pump3);
// Pump3.setState(PumpState.revers);
// let Label1 = new Label(new Point(500, 100), 350, Disposition.Horizontal, 140, true, 'p2');
// let Label1 = new Label(Pump2, true, 'p2');
// surfaceScheme.addWidget(Label1);
// let Degree1 = new LabelDegree(Pump2, true, '90');
// surfaceScheme.addWidget(Degree1);
// let pool1 = new Pool(new Point(400, 50), 250, 100);
// valveY2.setState(ValveState.opened)
// surfaceScheme.addWidget(pumpM1_1);
// точка (x,y), длина, высота
// let Conveyor1 = new Conveyor(new Point(100, 100), 200, 50);
// surfaceScheme.addWidget(Conveyor1);
// Point - wtynh треугольника, второй параметр - радиус окружности, в которую вписан треугольник
// let ConeCrusher1 = new ConeCrusher(new Point(900, 200), 50);
// surfaceScheme.addWidget(ConeCrusher1);
// левый верхний угол трапеции точка (x,y), высота трапеци
// let Crush1 = new Crush(new Point(1000, 100), 100);
// surfaceScheme.addWidget(Crush1);
// let Stone1 = new Stone(new Point(1000, 300), 50);
// surfaceScheme.addWidget(Stone1);
// https://www.hacksparrow.com/nodejs/tcp-socket-programming-in-node-js.html
// let _sock;
// var server = net.createServer();
// server.listen(PORT, HOST);
// console.log('Server listening on ' + server.address().address +':'+ server.address().port);
// server.on('connection', function(sock) {
//   console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
//   // other stuff is the same from here
//     _sock = sock; 
//     sock.on('data', function(data) {
//         console.log('DATA ' + sock.remoteAddress + ': ' + data);
//         // Write the data back to the socket, the client will receive it as data from the server
//         sock.write('You said "' + data + '"');
//   });
//   // Add a 'close' event handler to this instance of socket
//  sock.on('close', function(data) {
//    console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
//  });
// });
// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
// net.createServer(function (sock) {
//     // We have a connection - a socket object is assigned to the connection automatically
//     console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
//     _sock = sock;
//     // Add a 'data' event handler to this instance of socket
//     sock.on('data', function (data) {
//         console.log('DATA ' + sock.remoteAddress + ': ' + data);
//         // Write the data back to the socket, the client will receive it as data from the server
//         sock.write('You said "' + data + '"');
//     });
//     // Add a 'close' event handler to this instance of socket
//     sock.on('close', function (data) {
//         console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
//     });
// }).listen(PORT, HOST);
// console.log('Server listening on ' + HOST + ':' + PORT);
// function testSend() {
//     let byteNumber = (<HTMLInputElement>document.getElementById("byteNumber")).value;
//     let outputNumber = (<HTMLInputElement>document.getElementById("outputNumber")).value;
//     let check = (<HTMLInputElement>document.getElementById("setOrClear")).checked;
//     console.log(`testSend byteNumber = ${byteNumber}; outputNumber = ${outputNumber}; check = ${check}`);
//     //_sock.write('Hello from type script!!!');
// }
// function  testBreak(){
//     //stopConnection();
//     return;
//     let byteNumber = (<HTMLInputElement>document.getElementById("byteNumber")).value;
//     let outputNumber = (<HTMLInputElement>document.getElementById("outputNumber")).value;
//     let check = (<HTMLInputElement>document.getElementById("setOrClear")).checked;
//     console.log(`testSend byteNumber = ${byteNumber}; outputNumber = ${outputNumber}; check = ${check}`);
//     //_sock.write('Hello from type script!!!');
//     //surfaceScheme.startStop();
//     techWater.startStop();
// }
function testConnect() {
    tcpipConnector_1._testConnect();
}
function testSend() {
    tcpipConnector_1._testSend(document.getElementById("setOrClear").checked);
}
function sendReload() {
    tcpipConnector_1._sendReload();
}
function sendReCreate() {
    tcpipConnector_1._reCreate();
}
function testClear() {
    console.log('CCCCCCCCCCCCCCLLLLLLLLLLLLLEEEEEEEEEEEAAAAAAAAAAARRRRRRRRRRR');
    console.clear();
}
function step() { tcpipConnector_1._step(); }
var mes = {
    Y11Status: 0,
    Y12Status: 1,
    Y13Status: 3,
    Y14Status: 4,
    Y15Status: 5,
    Y21Status: 2,
    Y22Status: 4,
    Y23Status: 5,
    Y24Status: 0,
    Y25Status: 1,
    Y31Status: 2,
    Y32Status: 3,
    Y33Status: 4,
    Y34Status: 5,
    Y35Status: 4,
    Y11Mode: 0,
    Y12Mode: 1,
    Y13Mode: 2,
    Y14Mode: 2,
    Y15Mode: 1,
    Y21Mode: 0,
    Y22Mode: 1,
    Y23Mode: 2,
    Y24Mode: 0,
    Y25Mode: 1,
    Y31Mode: 2,
    Y32Mode: 2,
    Y33Mode: 1,
    Y34Mode: 0,
    Y35Mode: 1,
    Y11Error: 0,
    Y12Error: 1,
    Y13Error: 2,
    Y14Error: 3,
    Y15Error: 2,
    Y21Error: 1,
    Y22Error: 0,
    Y23Error: 1,
    Y24Error: 2,
    Y25Error: 3,
    Y31Error: 3,
    Y32Error: 2,
    Y33Error: 1,
    Y34Error: 0,
    Y35Error: 1,
    Pump1Status: 0,
    Pump2Status: 1,
    Pump3Status: 4,
    Pump1Mode: 1,
    Pump2Mode: 2,
    Pump3Mode: 1,
    Pump1Error: 0,
    Pump2Error: 1,
    Pump3Error: 3,
    Y11pos: 0,
    Y12pos: 100,
    Y13pos: 35,
    Y14pos: 0,
    Y15pos: 0,
    Y21pos: 0,
    Y22pos: 0,
    Y23pos: 0,
    Y24pos: 0,
    Y25pos: 0,
    Y31pos: 0,
    Y32pos: 0,
    Y33pos: 0,
    Y34pos: 0,
    Y35pos: 0,
    reserve: null
};
var mes1 = {
    "Y11Status": 3,
    "Y12Status": 3,
    "Y13Status": 1,
    "Y14Status": 1,
    "Y15Status": 1,
    "Y21Status": 3,
    "Y22Status": 3,
    "Y23Status": 1,
    "Y24Status": 1,
    "Y25Status": 1,
    "Y31Status": 3,
    "Y32Status": 0,
    "Y33Status": 1,
    "Y34Status": 1,
    "Y35Status": 1,
    "Y11Mode": 0,
    "Y12Mode": 0,
    "Y13Mode": 0,
    "Y14Mode": 0,
    "Y15Mode": 0,
    "Y21Mode": 0,
    "Y22Mode": 0,
    "Y23Mode": 0,
    "Y24Mode": 0,
    "Y25Mode": 0,
    "Y31Mode": 0,
    "Y32Mode": 0,
    "Y33Mode": 0,
    "Y34Mode": 0,
    "Y35Mode": 0,
    "Y11Err": 0,
    "Y12Err": 0,
    "Y13Err": 0,
    "Y14Err": 0,
    "Y15Err": 0,
    "Y21Err": 0,
    "Y22Err": 0,
    "Y23Err": 0,
    "Y24Err": 0,
    "Y25Err": 0,
    "Y31Err": 0,
    "Y32Err": 0,
    "Y33Err": 0,
    "Y34Err": 0,
    "Y35Err": 0,
    "Pump1Status": 0,
    "Pump2Status": 0,
    "Pump3Status": 0,
    "Pump1Mode": 1,
    "Pump2Mode": 1,
    "Pump3Mode": 1,
    "Pump1Err": 0,
    "Pump2Err": 0,
    "Pump3Err": 0,
    "posY11": 100,
    "posY12": 100,
    "posY13": 0,
    "posY14": 0,
    "posY15": 0,
    "posY21": 100,
    "posY22": 100,
    "posY23": 0,
    "posY24": 0,
    "posY25": 0,
    "posY31": 100,
    "posY32": 100,
    "posY33": 0,
    "posY34": 0,
    "posY35": 0,
    "res": 0
};
var mes2 = {
    "Y41Status": 3,
    "Y42Status": 3,
    "Y43Status": 1,
    "Y44Status": 1,
    "Y45Status": 1,
    "Y51Status": 1,
    "Y52Status": 3,
    "Y53Status": 1,
    "Y54Status": 1,
    "Y55Status": 1,
    "Y41Mode": 0,
    "Y42Mode": 0,
    "Y43Mode": 0,
    "Y44Mode": 0,
    "Y45Mode": 0,
    "Y51Mode": 0,
    "Y52Mode": 0,
    "Y53Mode": 0,
    "Y54Mode": 0,
    "Y55Mode": 0,
    "Y41Err": 0,
    "Y42Err": 0,
    "Y43Err": 0,
    "Y44Err": 0,
    "Y45Err": 0,
    "Y51Err": 0,
    "Y52Err": 0,
    "Y53Err": 0,
    "Y54Err": 0,
    "Y55Err": 0,
    "Pump4Status": 0,
    "Pump5Status": 0,
    "Pump4Mode": 1,
    "Pump5Mode": 1,
    "Pump4Err": 0,
    "Pump5Err": 0,
    "Y41pos": 100,
    "Y42pos": 100,
    "Y43pos": 0,
    "Y44pos": 0,
    "Y45pos": 0,
    "Y51pos": 0,
    "Y52pos": 100,
    "Y53pos": 0,
    "Y54pos": 0,
    "Y55pos": 0,
    "PoolMSBLevel": 0,
    "PoolLSBlevel": 32
};
// Clear Pump message
var mesClear = {
    Y1Status: 1,
    Y110Status: 2,
    Y111Status: 3,
    Y112Status: 4,
    Y120Status: 5,
    Y121Status: 6,
    Y122Status: 7,
    Y1Mode: 8,
    Y110Mode: 9,
    Y111Mode: 10,
    Y112Mode: 11,
    Y120Mode: 12,
    Y121Mode: 13,
    Y122Mode: 14,
    Y1Err: 15,
    Y110Err: 16,
    Y111Err: 17,
    Y120Err: 19,
    Y121Err: 20,
    Y122Err: 21,
    M1Status: 22,
    M2Status: 23,
    M1Mode: 24,
    M2Mode: 25,
    M1Err: 26,
    M2Err: 27,
    ClearLevel: 28,
    TowerLevel: 29,
    Press1: 30,
    Press2: 31,
    ClearHLevel: 32,
    ClearLLevel: 33,
    TowerHLevel: 34,
    TowerLLevel: 35,
    M0Status: 36,
    DP3Status: 37,
    DP4Status: 38,
    M0Mode: 39,
    DP3Mode: 40,
    DP4Mode: 41,
    M0Err: 42,
    DP3Err: 43,
    DP4Err: 44
};
var mesTech = {
    Y2Status: 1,
    Y210Status: 2,
    Y211Status: 3,
    Y212Status: 4,
    Y220Status: 5,
    Y221Status: 6,
    Y222Status: 7,
    Y2Mode: 8,
    Y210Mode: 9,
    Y211Mode: 10,
    Y212Mode: 11,
    Y220Mode: 12,
    Y221Mode: 13,
    Y222Mode: 14,
    Y2Err: 15,
    Y210Err: 16,
    Y211Err: 17,
    Y212Err: 18,
    Y220Err: 19,
    Y221Err: 20,
    Y222Err: 21,
    M3Status: 22,
    M4Status: 23,
    M3Mode: 24,
    M4Mode: 25,
    M3Err: 26,
    M4Err: 27,
    TechLevel: 28,
    Press3: 29,
    Press4: 30,
    TechHLevel: 31,
    TechLLevel: 32,
    M0Status: 33,
    DP3Status: 34,
    DP4Status: 35,
    M0Mode: 36,
    DP3Mode: 37,
    DP4Mode: 38,
    M0Err: 39,
    DP3Err: 40,
    DP4Err: 41,
};
sendMes('drainageA', mes);
sendMes('clearPump', mesClear);
sendMes('techPump', mesTech);
//# sourceMappingURL=renderer.js.map
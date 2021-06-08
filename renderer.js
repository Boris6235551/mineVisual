"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_js_1 = __importDefault(require("vue/dist/vue.js")); // вместо import Vue from 'vue'
var mine_drawing_1 = require("./mine_drawing");
var _skip_1 = require("./_skip");
var _batcher_1 = require("./_batcher");
var _substation_1 = require("./_substation");
var _cage_1 = require("./_cage");
var _compressorRoom_1 = require("./_compressorRoom");
var _batcherlable_1 = require("./_batcherlable");
var BrowserWindow = require('electron').remote.BrowserWindow;
var screenMain = new mine_drawing_1.Screen();
// // let techWater = new TechWater('container', window.innerWidth, window.innerHeight);
var cage = new _cage_1.CAGE('containerCage', window.innerWidth, window.innerHeight);
// // let dsf = new DSF('containerDSF', window.innerWidth * 0.3, window.innerHeight);
var compressoRroomUndeground = new _compressorRoom_1.COMPRESSORROOM('containerCompressoRroomUndeground', window.innerWidth, window.innerHeight);
var skip = new _skip_1.SKIP('containerSkip', window.innerWidth, window.innerHeight);
var batcher = new _batcher_1.BATCHER('batcher', window.innerWidth, window.innerHeight);
var substationUndeground = new _substation_1.SUBSTATION('substation', window.innerWidth, window.innerHeight);
var batcherlable = new _batcherlable_1.BATCHERLABLE('batcherlable', window.innerWidth, window.innerHeight);
// screenMain.addScheme(techWater);
// screenMain.addScheme(dsf);
screenMain.addScheme(skip);
screenMain.addScheme(batcher);
screenMain.addScheme(cage);
screenMain.addScheme(substationUndeground);
screenMain.addScheme(compressoRroomUndeground);
screenMain.addScheme(batcherlable);
// screenMain.addScheme(undegroundpump);
var tcpipConnector_1 = require("./tcpipConnector");
function sendMes(name, mes) {
    screenMain.resendMessage(name, mes);
}
tcpipConnector_1.startClients(sendMes);
// animateScheme(dsf, 500);
mine_drawing_1.animateScheme(batcher, 500);
mine_drawing_1.animateScheme(skip, 500);
mine_drawing_1.animateScheme(cage, 500);
mine_drawing_1.animateScheme(substationUndeground, 500);
mine_drawing_1.animateScheme(compressoRroomUndeground, 500);
mine_drawing_1.animateScheme(batcherlable, 500);
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
    console.clear();
}
function step() { tcpipConnector_1._step(); }
//# sourceMappingURL=renderer.js.map
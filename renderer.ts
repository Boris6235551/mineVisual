import Vue from 'vue/dist/vue.js'; // вместо import Vue from 'vue'
import { Screen, Point, animateScreen } from './mine_drawing'
// import { TechWater } from './_techWater'
import { DSF } from './_dsf'
import { SKIP } from './_skip'
import { BATCHER } from './_batcher'
import { UNDERGROUNDSUBSTATION } from './_undergroundsubstation'
import { CAGE } from './_cage'
import { UNDEGROUNDPUMP, SURFACEPUMP } from './_undegroundPump'
import { BATCHERLABLE } from './_batcherlable'
import { RECEIVINGHOPPER } from './_receivinghopper'
import { SUBSTATION } from './_substation'
import { COMPRESSOR } from './_compressor';
const { remote, ipcRenderer, electron } = require("electron");
const { BrowserWindow } = require('electron').remote
const moment = require('moment');

ipcRenderer.on('resended', (event, arr) => {
    console.log('resended');
});

import { Previewer } from 'pagedjs';
let paged = new Previewer();
// let flow = paged.preview(DOMContent, ["path/to/css/file.css"], document.body).then((flow) => {
// 	console.log("Rendered", flow.total, "pages.");
// })





let screenMain = new Screen();
// // let techWater = new TechWater('container', window.innerWidth, window.innerHeight);
let cage = new CAGE('containerCage', window.innerWidth, window.innerHeight);
let UndegroundPump1 = new UNDEGROUNDPUMP('containerUndegroundPump1', window.innerWidth, window.innerHeight,
    new Point(350, 90), 1);
let UndegroundPump2 = new UNDEGROUNDPUMP('containerUndegroundPump2', window.innerWidth, window.innerHeight,
    new Point(350, 90), 2);
let SurfacePump = new SURFACEPUMP('containerSurfacePump1', window.innerWidth, window.innerHeight,
    new Point(2545, 44));
let dsf = new DSF('containerDSF', window.innerWidth, window.innerHeight);
let skip = new SKIP('containerSkip', window.innerWidth, window.innerHeight);
let batcher = new BATCHER('batcher', window.innerWidth, window.innerHeight);
let substationUndeground = new UNDERGROUNDSUBSTATION('undergroundsubstation', window.innerWidth, window.innerHeight);
let batcherlable = new BATCHERLABLE('batcherlable', window.innerWidth, window.innerHeight);
let receivingHopper = new RECEIVINGHOPPER('receivinghopper', window.innerWidth, window.innerHeight);
let substation = new SUBSTATION('substation', window.innerWidth, window.innerHeight);
let compressor = new COMPRESSOR('compressor', window.innerWidth, window.innerHeight)


screenMain.addScheme(dsf);
screenMain.addScheme(skip);
screenMain.addScheme(batcher);
screenMain.addScheme(cage);
screenMain.addScheme(substationUndeground);
screenMain.addScheme(UndegroundPump1);
screenMain.addScheme(UndegroundPump2);
screenMain.addScheme(SurfacePump);
screenMain.addScheme(batcherlable);
screenMain.addScheme(receivingHopper);
screenMain.addScheme(substation);
screenMain.addScheme(compressor);

import { startClients, stopConnection, _reCreate, _testConnect, _testSend, _sendReload, _step } from './tcpipConnector'

function sendMes(name, mes) {
    screenMain.resendMessage(name, mes);
}

startClients(sendMes);

// animateScreen(screenMain, 500);

// animateScheme(dsf, 500);
// animateScheme(batcher, 500);
// animateScheme(skip, 500);
// animateScheme(cage, 500);
// animateScheme(substationUndeground, 500);
//  animateScheme(UndegroundPump1, 500);
//  animateScheme(UndegroundPump2, 500);
//  animateScheme(SurfacePump, 500);
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

let main = new Vue({
    el: '#index_body',
    methods: {
        printReport: function () {
            const reportWin = new BrowserWindow({
                width: 800,
                height: 600,
                frame: false,
                parent: remote.getCurrentWindow(),
                webPreferences: {
                    nodeIntegration: true
                }
            });
            reportWin.loadFile('report.html');
            // reportWin.print()
            // reportWin.webContents.openDevTools();
        }
    }
})


/*
batcher.BunkerLeft.propBit = true
batcher.FeederLeft.propBit - on/off
batcher.FeederLeft.enable
batcher.FeederRight.propBit - on/off
batcher.FeederRight.enable
batcher.ChuteLeft.propBit
batcher.ChuteRight.propBit
batcher.GateRight1.opened
batcher.GateRight1.closed



*/


// ###############################################################################################
// ###############################################################################################
// ###############################################################################################
//import { Scheme, Disposition, Point, PropParams } from './mine_drawing';


// import { Label, LabelDegree } from './label'
// import { CompressorRoom } from './compressorRoom'
// import { Skip } from './skip'

import { Cage } from './cage'

import { OverheadSubstationTrunk, OverheadSubstationCell } from './overheadSubstation'

import { GroundHorizontalLine, GroundVerticalLine } from './groundLines'
import { Compressor } from './pumpAccessories';

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
    _testConnect();
}

function testSend() {
    _testSend((<HTMLInputElement>document.getElementById("setOrClear")).checked);
}

function sendReload() {
    _sendReload();
}

function sendReCreate() {
    _reCreate();
}

function testClear() {
    console.log('CCCCCCCCCCCCCCLLLLLLLLLLLLLEEEEEEEEEEEAAAAAAAAAAARRRRRRRRRRR')
    console.clear();
}

function step() { _step(); }




let mes = {
    Y11Status: 1,   // enum ValveStatus InitState = 0, Closed, Opening, Opened, Closing , Calibration
    Y12Status: 1,
    Y13Status: 1,
    Y14Status: 2,
    Y15Status: 2,
    Y21Status: 2,
    Y22Status: 3,
    Y23Status: 3,
    Y24Status: 3,
    Y25Status: 1,
    Y31Status: 4,
    Y32Status: 4,
    Y33Status: 4,
    Y34Status: 4,
    Y35Status: 4,

    Y11Mode: 2,     // enum ValveMode HandDrive = 0, Auto, Service
    Y12Mode: 2,
    Y13Mode: 2,
    Y14Mode: 2,
    Y15Mode: 2,
    Y21Mode: 2,
    Y22Mode: 2,
    Y23Mode: 2,
    Y24Mode: 2,
    Y25Mode: 2,
    Y31Mode: 2,
    Y32Mode: 2,
    Y33Mode: 1,
    Y34Mode: 0,
    Y35Mode: 1,

    Y11Err: 0,    // enum ValveError NoError = 0, CloseAndOpenVlaveInputs, OpeningTimeOut, ClosingTimeOut, AlarmValveInput 
    Y12Err: 1,
    Y13Err: 2,
    Y14Err: 3,
    Y15Err: 2,
    Y21Err: 1,
    Y22Err: 0,
    Y23Err: 1,
    Y24Err: 2,
    Y25Err: 3,
    Y31Err: 3,
    Y32Err: 2,
    Y33Err: 1,
    Y34Err: 0,
    Y35Err: 1,

    Pump1Status: 0, // enum PumpStatus Stopped = 0, Starting, Working, Stopping, Error
    Pump2Status: 1,
    Pump3Status: 4,

    Pump1Mode: 1,   // enum PumpMode Auto = 1, Service 
    Pump2Mode: 1,
    Pump3Mode: 2,

    Pump1Error: 0,  // enum PumpError NoError = 0, StartingTimeOut, StoppingTimeOut, AccidentPressure
    Pump2Error: 1,
    Pump3Error: 3,

    Y11pos: 90,      // 0 - 100
    Y12pos: 100,
    Y13pos: 35,
    Y14pos: 34,
    Y15pos: 50,
    Y21pos: 50,
    Y22pos: 45,
    Y23pos: 34,
    Y24pos: 76,
    Y25pos: 12,
    Y31pos: 45,
    Y32pos: 67,
    Y33pos: 12,
    Y34pos: 56,
    Y35pos: 87,
    reserve: null
}

let mes2 = {
    "Y41Status": 3,
    "Y42Status": 3,
    "Y43Status": 3,
    "Y44Status": 3,
    "Y45Status": 3,
    "Y51Status": 3,
    "Y52Status": 3,
    "Y53Status": 3,
    "Y54Status": 3,
    "Y55Status": 3,
    "Y41Mode": 1,
    "Y42Mode": 1,
    "Y43Mode": 1,
    "Y44Mode": 1,
    "Y45Mode": 1,
    "Y51Mode": 1,
    "Y52Mode": 1,
    "Y53Mode": 1,
    "Y54Mode": 1,
    "Y55Mode": 1,
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
    "Pump4Status": 2,
    "Pump5Status": 2,
    "Pump4Mode": 1,
    "Pump5Mode": 1,
    "Pump4Err": 0,
    "Pump5Err": 0,
    "Y41pos": 50,
    "Y42pos": 50,
    "Y43pos": 50,
    "Y44pos": 50,
    "Y45pos": 50,
    "Y51pos": 50,
    "Y52pos": 50,
    "Y53pos": 50,
    "Y54pos": 50,
    "Y55pos": 50,
    "PoolLevel": 23,
}

// Clear Pump message
let mesClear = {
    Y1_Status: 2,
    Y110Status: 1,
    Y111Status: 1,
    Y112Status: 1,
    Y120Status: 1,
    Y121Status: 1,
    Y122Status: 1,
    Y1_Mode: 2,
    Y110Mode: 1,
    Y111Mode: 1,
    Y112Mode: 1,
    Y120Mode: 1,
    Y121Mode: 1,
    Y122Mode: 1,
    Y1_Err: 1,
    Y110Err: 1,
    Y111Err: 1,
    Y120Err: 1,
    Y121Err: 2,
    Y122Err: 2,
    M1Status: 2,
    M2Status: 2,
    M1Mode: 2,
    M2Mode: 2,
    M1Err: 2,
    M2Err: 2,
    ClearLevel: 20,
    TowerLevel: 80,
    M1Press: 1,
    M2Press: 1,
    ClearHLevel: 2,
    ClearLLevel: 1,
    TowerHLevel: 1,
    TowerLLevel: 1,
    M0Status: 1,
    DP3Status: 1,
    DP4Status: 1,
    M0Mode: 1,
    DP3Mode: 1,
    DP4Mode: 1,
    M0Err: 2,
    DP3Err: 1,
    DP4Err: 1
}

let mesTech = {
    Y2_Status: 1,
    Y210Status: 2,
    Y211Status: 1,
    Y212Status: 1,
    Y220Status: 1,
    Y221Status: 1,
    Y222Status: 1,
    Y2_Mode: 1,
    Y210Mode: 1,
    Y211Mode: 1,
    Y212Mode: 1,
    Y220Mode: 1,
    Y221Mode: 1,
    Y222Mode: 1,
    Y2_Err: 1,
    Y210Err: 1,
    Y211Err: 1,
    Y212Err: 1,
    Y220Err: 1,
    Y221Err: 2,
    Y222Err: 2,
    M3Status: 2,
    M4Status: 1,
    M3Mode: 2,
    M4Mode: 2,
    M3Err: 2,
    M4Err: 2,
    TechLevel: 40,
    M3Press: 1,
    M4Press: 1,
    TechHLevel: 1,
    TechLLevel: 2,
    M0Status: 1,
    DP3Status: 1,
    DP4Status: 1,
    M0Mode: 1,
    DP3Mode: 1,
    DP4Mode: 1,
    M0Err: 1,
    DP3Err: 1,
    DP4Err: 1,

}

sendMes('drainageA', mes);
sendMes('drainageB', mes2);
sendMes('clearPump', mesClear);
sendMes('techPump', mesTech);
import Vue from 'vue/dist/vue.js'; // вместо import Vue from 'vue'
import { Screen, Point, animateScreen } from './mine_drawing'
import { TechWater } from './_techWater'
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
const { ipcRenderer }  = require('electron');
const { BrowserWindow } = require('electron').remote


ipcRenderer.on('resended', (event, arr) => {
    console.log('resended');
});



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

animateScreen(screenMain, 500);

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

new Vue({
    el: '#index_body',
    methods: {
        printReport: function () {
            const reportWin = new BrowserWindow({
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
    Y11Status: 0,   // enum ValveStatus InitState = 0, Closed, Opening, Opened, Closing , Calibration
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
    
    Y11Mode: 0,     // enum ValveMode HandDrive = 0, Auto, Service
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
    Pump2Mode: 2,
    Pump3Mode: 1,
    
    Pump1Error: 0,  // enum PumpError NoError = 0, StartingTimeOut, StoppingTimeOut, AccidentPressure
    Pump2Error: 1,
    Pump3Error: 3,
    
    Y11pos: 0,      // 0 - 100
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
} 

let mes2 = {
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
    "PoolLevel": 73,
}

// Clear Pump message
let mesClear = {
Y1_Status:   1,
Y110Status: 2,
Y111Status: 3,
Y112Status: 4,
Y120Status: 5,
Y121Status: 6,
Y122Status: 7,
Y1_Mode:     8,
Y110Mode:   9,
Y111Mode:   10,
Y112Mode:   11,
Y120Mode:   12,
Y121Mode:   13,
Y122Mode:   14,
Y1_Err:      15,
Y110Err:    16,
Y111Err:    17 ,           
Y120Err:    19,
Y121Err:    20,
Y122Err:    21 ,         
M1Status:   22,
M2Status:   23,
M1Mode:     24,
M2Mode:     25,
M1Err:      26,
M2Err:      27,
ClearLevel: 28,
TowerLevel: 29,
M1Press:    30,
M2Press:    31,
ClearHLevel:32,
ClearLLevel:33,
TowerHLevel:34,
TowerLLevel:35,
M0Status:   36,
DP3Status:  37,
DP4Status:  38,
M0Mode:     39,
DP3Mode:    40,
DP4Mode:    41,
M0Err:      42,
DP3Err:     43,
DP4Err:     44
}

let mesTech = {
    Y2_Status	:	1	,
    Y210Status	:	2	,
    Y211Status	:	3	,
    Y212Status	:	4	,
    Y220Status	:	5	,
    Y221Status	:	6	,
    Y222Status	:	7	,
    Y2_Mode	    :	8	,
    Y210Mode	:	9	,
    Y211Mode	:	10	,
    Y212Mode	:	11	,
    Y220Mode	:	12	,
    Y221Mode	:	13	,
    Y222Mode	:	14	,
    Y2_Err	    :	15	,
    Y210Err	    :	16	,
    Y211Err	    :	17	,
    Y212Err	    :	18	,
    Y220Err	    :	19	,
    Y221Err	:	20	,
    Y222Err	:	21	,
    M3Status	:	22	,
    M4Status	:	23	,
    M3Mode	:	24	,
    M4Mode	:	25	,
    M3Err	:	26	,
    M4Err	:	27	,
    TechLevel	:	78	,
    M3Press	:	29	,
    M4Press	:	30	,
    TechHLevel	:	31	,
    TechLLevel	:	32	,
    M0Status	:	33	,
    DP3Status	:	34	,
    DP4Status	:	35	,
    M0Mode	:	36	,
    DP3Mode	:	37	,
    DP4Mode	:	38	,
    M0Err	:	39	,
    DP3Err	:	40	,
    DP4Err	:	41	,
    
}

sendMes('drainageA', mes);
sendMes('drainageB', mes2);
sendMes('clearPump', mesClear);
sendMes('techPump', mesTech);
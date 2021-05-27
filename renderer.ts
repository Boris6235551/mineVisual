import {
    Scheme, Disposition, animateScheme, Point, Pool,    
} from './mine_drawing';

import {Valve, ValveState} from './valve';

import {Connection, Corner, CornerOrientation} from './tube';

import {Pump, PumpState, Undegraund} from './Pump';

let surfaceScheme = new Scheme('container', window.innerWidth, window.innerHeight);
// let pumpM1_1 = new Pump(10, 10, Disposition.Horizontal);
let valveY1 = new Valve(new Point(100, 30), 90, Disposition.Vertical, 90);
//valveY1.setPercentage(100);
valveY1.setState(ValveState.opening);
surfaceScheme.addWidget(valveY1);

let valveY2 = new Valve(new Point(100, 801), 90, Disposition.Vertical, 80);
valveY2.setState(ValveState.opened);
surfaceScheme.addWidget(valveY2);

let corn = new Corner(new Point(200, 200), 1, Disposition.Vertical, CornerOrientation.LeftUp, true );
surfaceScheme.addWidget(corn);

let Pump1 = new Pump(new Point(200, 50), 250, Disposition.Horizontal);
surfaceScheme.addWidget(Pump1);
Pump1.setState(PumpState.run)

let Pump2 = new Pump(new Point(500, 100), 250, Disposition.Vertical);
surfaceScheme.addWidget(Pump2);
Pump2.setState(PumpState.revers)

let Pump3 = new Undegraund(new Point(200, 400), 100, Disposition.Vertical);
surfaceScheme.addWidget(Pump3);
Pump3.setState(PumpState.revers)
// let pool1 = new Pool(new Point(400, 50), 250, 100);

// valveY2.setState(ValveState.opened)
// surfaceScheme.addWidget(pumpM1_1);



//  valveY2.setState(ValveState.opened);
//  surfaceScheme.addWidget(valveY2);

//  valveY3.setState(ValveState.opened);

// surfaceScheme.addWidget(pool1);
let line1 = new Connection(new Point(0,0), 100, Disposition.Vertical);
line1.connectVertical(valveY1, valveY2);
surfaceScheme.addWidget(line1);

animateScheme(surfaceScheme, 500);

import {startClient, stopConnection, _reCreate, _testConnect, _testSend, _sendReload, _step} from './tcpipConnector'

startClient();

function  testBreak(){
    
    //stopConnection();
    
    return;

    let byteNumber = (<HTMLInputElement>document.getElementById("byteNumber")).value;
    let outputNumber = (<HTMLInputElement>document.getElementById("outputNumber")).value;
    let check = (<HTMLInputElement>document.getElementById("setOrClear")).checked;
    console.log(`testSend byteNumber = ${byteNumber}; outputNumber = ${outputNumber}; check = ${check}`);
    //_sock.write('Hello from type script!!!');
    surfaceScheme.startStop();
}

function testConnect(){
    _testConnect();
}

function  testSend(){
    _testSend( (<HTMLInputElement>document.getElementById("setOrClear")).checked );
}

function sendReload(){
    _sendReload();
}

function sendReCreate(){
    _reCreate();
}

function testClear(){
    console.clear();   
}

function step(){_step();}
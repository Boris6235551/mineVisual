import { animateScheme } from './mine_drawing'
import { TechWater } from './_techWater'

//let surfaceScheme = new Scheme('container', window.innerWidth, window.innerHeight);
let techWater = new TechWater('container', window.innerWidth, window.innerHeight);

//animateScheme(surfaceScheme, 500);
animateScheme(techWater, 500);

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
    //surfaceScheme.startStop();
    techWater.startStop();
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

var net = require('net');

var HOST = '192.168.100.3';
// var HOST = '192.168.0.99';
var PORT = 27069;

import {
    Scheme, Pump, Disposition, animateScheme, Point, Pool,    
} from './mine_drawing';

import {Valve, ValveState} from './valve';

import {Connection, testArray} from './tube';

let surfaceScheme = new Scheme('container', window.innerWidth, window.innerHeight);
// let pumpM1_1 = new Pump(10, 10, Disposition.Horizontal);
let valveY1 = new Valve(new Point(100, 100), 100, Disposition.Vertical, 20);
surfaceScheme.addWidget(valveY1);

let valveY2 = new Valve(new Point(100, 400), 100, Disposition.Vertical, 80);
surfaceScheme.addWidget(valveY2);

let valveY3 = new Valve(new Point(400, 100), 250, Disposition.Horizontal, 20);
surfaceScheme.addWidget(valveY3);

let valveY4 = new Valve(new Point(400, 400), 250, Disposition.Vertical, 20);
surfaceScheme.addWidget(valveY4);

let valveY5 = new Valve(new Point(800, 100), 200, Disposition.Vertical, 20);
surfaceScheme.addWidget(valveY5);

let valveY6 = new Valve(new Point(800, 400), 200, Disposition.Horizontal, 20);
surfaceScheme.addWidget(valveY6);

let valveY7 = new Valve(new Point(1100, 100), 50, Disposition.Vertical, 20);
surfaceScheme.addWidget(valveY7);

let valveY8 = new Valve(new Point(1100, 400), 50, Disposition.Horizontal, 20);
surfaceScheme.addWidget(valveY8);

// valveY1.setState(ValveState.opened)
// let pool1 = new Pool(new Point(400, 50), 250, 100);

// valveY2.setState(ValveState.opened)
// surfaceScheme.addWidget(pumpM1_1);



//  valveY2.setState(ValveState.opened);
//  surfaceScheme.addWidget(valveY2);

//  valveY3.setState(ValveState.opened);

// surfaceScheme.addWidget(pool1);
// let line1 = new Connection(new Point(0,0), 100, Disposition.Vertical);
// line1.connectVertical(valveY1, valveY2);
// surfaceScheme.addWidget(line1);

// animateScheme(surfaceScheme, 500);

testArray();

// https://www.hacksparrow.com/nodejs/tcp-socket-programming-in-node-js.html

let _sock;
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
net.createServer(function(sock) {
    // We have a connection - a socket object is assigned to the connection automatically
   console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
    _sock = sock;

    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
      console.log('DATA ' + sock.remoteAddress + ': ' + data);
      // Write the data back to the socket, the client will receive it as data from the server
      sock.write('You said "' + data + '"');
    });
    // Add a 'close' event handler to this instance of socket
   sock.on('close', function(data) {
     console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
   });
  
  }).listen(PORT, HOST);
  
  console.log('Server listening on ' + HOST +':'+ PORT);

function  testSend(){
    let byteNumber = (<HTMLInputElement>document.getElementById("byteNumber")).value;
    let outputNumber = (<HTMLInputElement>document.getElementById("outputNumber")).value;
    let check = (<HTMLInputElement>document.getElementById("setOrClear")).checked;
    console.log(`testSend byteNumber = ${byteNumber}; outputNumber = ${outputNumber}; check = ${check}`);
    //_sock.write('Hello from type script!!!');
}

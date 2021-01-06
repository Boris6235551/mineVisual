
var net = require('net');

var HOST = '192.168.100.3';
var PORT = 27069;

import {Scheme, Pump, Valve, Disposition, animateScheme, Point, ValveState} from './mine_drawing';


let surfaceScheme = new Scheme('container', window.innerWidth, window.innerHeight);
let pumpM1_1 = new Pump(10, 10, Disposition.Horizontal);
let valveY1 = new Valve(new Point(100, 100), 200, Disposition.Vertical);
valveY1.setState(ValveState.opening)
surfaceScheme.addWidget(pumpM1_1);
surfaceScheme.addWidget(valveY1);
animateScheme(surfaceScheme, 100);


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
    _sock.write('Hello from type script!!!');
}
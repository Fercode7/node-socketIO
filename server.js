
const port = process.env.port || 8000;
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server); // I pass the server to the socket so we can get a sync connection 


/**
 * We use this to listen to our port for any request
 */
server.listen(port, ()=>{
    console.log("Listenting in our http://localhost:8000 port");
});

/**
 * Socket listening onConneted Event
 */
io.on('connection', function(socket){
    console.log("User connected"); 
});


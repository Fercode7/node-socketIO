
const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server); // I pass the server to the socket so we can get a sync connection 


io.configure(function () {  
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

/**
 * We use this to listen to our port for any request
 */

server.listen(port, ()=>{
    console.log("Listenting in http://localhost:"+port);
});


/**
 * Sending a response on the root acces of our localhost
 */
app.get('/',(request, response)=>{
    // dirname is our directory to this folder
    response.send('<h1>Testing</h1>');
});

/**
 * Socket listening onConneted Event
 */
io.on('connection', function(socket){
    console.log("User connected"); 
    //User disconnected
   socket.on('disconnect', function(){
    console.log("User disconnected"); 
   });
   // We recieve a new event message from the android app
   socket.on('new message', function(message){
    console.log("Nuevo mensaje  " + message);
    io.emit('new message', {
        "mensaje": message
    });
   });
});

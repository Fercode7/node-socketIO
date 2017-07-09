
const port = process.env.port || 8000;
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server); // I pass the server to the socket so we can get a sync connection 


/**
 * We use this to listen to our port for any request
 */
server.listen(port, ()=>{
    console.log("Listenting in http://localhost:8000 port");
});

/**
 * Sending a response on the root acces of our localhost
 */
app.get('/',(request, response)=>{
    // dirname is our directory to this folder
    response.sendFile(__dirname+'/index.html');
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
    }
    
);
   });
});

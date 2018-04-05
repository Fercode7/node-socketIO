
const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server); // I pass the server to the socket so we can get a sync connection
const admin = require('firebase-admin'); //Firbase SDK
let serviceAccount = require(__dirname+'/services.json'); // path for the private key


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://testing-76919.firebaseio.com"
});

let db = admin.database();
let ref = db.ref("messages");

let usersRef = ref.child("users");
usersRef.set({
    message: {
        mensaje: "Hola",
        user:"luis"
  },
})

let hopperRed = ref.child('users/message');
hopperRed.update({
    mensaje:"Testing"
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

    console.log("User connected" + socket.id); 
    //User disconnected
   socket.on('disconnect', function(){
    console.log("User disconnected" + socket.id); 
   });
   // We recieve a new event message from the android app
   socket.on('new message', function(message){
    console.log("Nuevo mensaje  " + message);
    io.emit('new message', {
        "mensaje": message
    });
   });

});

var express = require('express');
var app = express();

// including events module - core nodejs
var events = require('events');

// creating an instance of event emitter
var eventEmitter = new events.EventEmitter();

// event listener
// we are waiting for the event to happen
eventEmitter.on('welcomeEmail', function (data){

    console.log("first listener was called");
    console.log("code to send welcome email will be written here");

});

// a basic route
app.get('/signup', function (req,res){

    // create a user
    // save it
    // send him a welcome email using event

    var user = { name: 'vivek', email: 'vivek1@gmail.com'};

    // this is how event is emitted.
    setTimeout(() =>{
        eventEmitter.emit('welcomeEmail', user);
    },2000);

    console.log('sending response')
    res.send('Hello World!');
});

app.listen(3000,function() {
    console.log('Example app listening on port 3000!');
});

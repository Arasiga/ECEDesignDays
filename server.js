var express = require("express");
var app = express();
var server = require('http').createServer(app);
var sock = require('socket.io')(server);
var path = require("path");

var servosData;
var speed;

app.use('/Images', express.static(__dirname + "/Images"));
app.use('/styles.css', express.static(__dirname + "/styles.css"));
app.use('/node_modules', express.static('node_modules'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/arduino_servos', function(req, res){
  // Connect arduino to socket, and then send it the live data from the web browser or mobile
  // console.log(dataToSend);
  res.send(servosData);
});

app.get('/arduino_speed', function(req, res){
  // Connect arduino to socket, and then send it the live data from the web browser or mobile
  // console.log(dataToSend);
  res.send(speed);
});

app.get('/mobile', function(req, res){
  // TODO: Connect mobile to socket, and then receive the live data from it

});

sock.on('connection', function(client){
  console.log("GOT CONNECTION");

  client.on('join', function(data) {
    servosData = data;
    console.log(servosData);
  });

  client.on("speed", function(data){
    speed = data;
    console.log(speed);
  })

});

server.listen(3000);
console.log("Running at Port 3000");

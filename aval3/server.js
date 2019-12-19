var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://mqtt.eclipse.org')

client.on('connect', function () {
  client.subscribe('sensortempufma')
  client.subscribe('sensorumidadeufma')
})

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
});

io.on('connection', function(socket){
  client.on('message', function (topic, message) {
    socket.emit(topic, message.toString())
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000')
});
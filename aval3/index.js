var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://mqtt.eclipse.org')

client.on('connect', function () {
  initHumidity()
  initTemperature(20)
})
function initHumidity(){
  var max = 100;
  var min = 75;
  var humidity = Math.floor(Math.random() * (max - min + 1) + min);

  client.publish('sensorumidadeufma', humidity.toString())
  setTimeout(initHumidity, 10000)
}

function initTemperature(temp){
  client.publish('sensortempufma', temp.toString())

  newTemp = temp + 1
  if(temp >= 40){
    newTemp = 20
  }else{
    newTemp = temp + 1
  }
  setTimeout(initTemperature, 3000, newTemp)
}





var net = require('net');
var HOST = '127.0.0.1';
var PORT =  '1337';

var PythonShell = require("python-shell");
var sleep = require('sleep');

var server = net.createServer(function(socket){
    //console.log('client connected');
    console.log('CONNECTADO POR: ' + socket.remoteAddress +':'+ socket.remotePort);

    socket.write('\t\t Menu\n\t1. hamburguer\n\t2. batata\n\t3. combo\n\t4. refri\n\nPara escolher digite o numero referente ao pedido: ');

    // Add a 'data' event handler to this instance of socket
    socket.on('data', function(data){

        if (data == '1' || data == '2' || data == '3' || data == '4') {
            socket.write("Seu pedido esta sendo preparado\n");
            sleep.sleep(5);
            socket.write("Seu pedido esta sendo enviado\n");
        } else {
            socket.write("O pedido inserido nao esta no menu\n");
        }

    });

    socket.on('end', function(){
        console.log('client disconnected');
    });


});

server.listen(4000);
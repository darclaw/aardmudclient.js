const net = require('net');

var config = require('../config.json');
var myscreen = require('../controllers/screen');


var socket = new net.Socket();

socket.on('data',function(data){
	//add parsing data
	
	myscreen.updateMain(data.toString());

});


exports.initialize=function(){
	socket.connect(config.server.port, config.server.host,
		function(){
			console.log("connected to "+config.server.host+":"+config.server.port);
		}
	);
}

exports.sendStr = function(str){
	socket.write(str);
}

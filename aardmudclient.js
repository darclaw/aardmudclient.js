var blessed = require('blessed');
var readline = require('readline');
const net = require('net');

var myscreen = require('./controllers/screen');
var mysocket = require('./controllers/socket');


var config = require('./config.json');

//connect to server
mysocket.initialize();
//create screen
myscreen.initialize();


////set up readline
//rl= readline.creatInterface({
//	input: process.stdin,
//	output: process.stdout
//});



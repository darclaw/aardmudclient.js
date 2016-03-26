var blessed = require('blessed');

var mysocket = require('../controllers/socket');

var config = require('../config.json');

var screen = blessed.screen({
	smartCSR:true
});
var map;
var main;
var inv;
var input;

var linestr="";
var linestrings=[];
var inputLineOffset=0;

screen.key(['C-c'], function(ch, key) {
	console.log("quiting");
	return process.exit(0);
});
screen.on('keypress', function(ch,key){
	if(key.name=="backspace"){
		linestr=linestr.substring(0,linestr.length-1);
		input.setContent(linestr);
		screen.render();
	}else if(key.name=="up"){
		inputLineOffset++;
		input.setContent(linestrings[(linestrings.length-inputLineOffset)%config.historyLength]);
		screen.render();
	}else if(key.name=="down"){
		if(inputLineOffset<=0){
			input.setContent("");
			inputLineOffset=0;
		}else{
			inputLineOffset--;
			input.setContent(linestrings[(linestrings.length-inputLineOffset)%config.historyLength]);
		}
		screen.render();
	}else{
		inputLineOffset=0;
		linestr+=ch;
		input.setContent(linestr);
		screen.render();
		if(key.sequence=='\r'){
			//parse string
			parsedString= linestr;
			//send to server
			mysocket.sendStr(linestr);
			if(linestr!="\r"&&linestr!=""){
				linestrings[(linestrings.length+1)%config.historyLength]=linestr;
			}

			linestr="";
		}
	}
});

exports.initialize=function(){
	screen.title = "change me";
	main = blessed.box({
		top:'0',
		left: '0',
		width: '66%',
		height: '100%-3',
		content: 'Hello {bold}world{/bold}!',
		tags: true,
		border: {
			type: 'line'
		},
		style: {
			fg: 'white',
			bg: 'magenta',
			border: {
				fg: '#f0f0f0'
			},
			hover: {
				bg: 'green'
			}
		},
		scrollable: true,
		scrollbar:{
			bg:'blue'
		}
	});
	input = blessed.box({
		top:'100%-3',
		left:'0',
		width:'66%',
		heigth:'3',
		content:'',
		tags:true,
		border:{
			type:'line'
		},
		style:{
			fg:'white',
			bg:'black',
			border:{
				fg:'#f0f0f0'
			}
		}
	});
	screen.append(input);
	screen.append(main);
	screen.render();
}
exports.updateMain=function(str){
	main.setContent(str);
	screen.render();
}

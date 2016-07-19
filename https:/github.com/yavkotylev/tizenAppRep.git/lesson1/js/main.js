var startTime;
var checkTime;
var imgH = "<h1>Multi-page application</h1><img src=\"images/tizen_32.png\" id=\'image_X\' width=\"32\"/>"

//Initialize function
var init = function () {
	// TODO:: Do your initialization job
	console.log("init() called");

	// add eventListener for tizenhwkey
	document.addEventListener('tizenhwkey', function(e) {
		if(e.keyName == "back") {
			try {
				tizen.application.getCurrentApplication().exit();
			} catch (error) {
				console.error("getCurrentApplication(): " + error.message);
			}
		}
	});
};
// window.onload can work without <body onload="">
window.onload = init;

function changeJQInf(){
	$("#JQInf1").css({'color': 'red'});
	$("#JQInf2").css({'color': 'blue'});
	$("#JQInf3").css({'color':'black'});
}

function startTime() {
	var today = new Date();
	var h = today.getHours();

	var m = today.getMinutes();
	var s = today.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('divbutton1').innerHTML="Current time: " + h + ":" + m + ":" + s;
	var t = setTimeout(startTime, 250);
}

function deleteImage(){
	
	if (document.getElementById('imageTizen32').innerHTML === "<h1>Multi-page application</h1>"){
		document.getElementById('imageTizen32').innerHTML = imgH;
	}
	else{
		document.getElementById('imageTizen32').innerHTML = "<h1>Multi-page application</h1>";
	}

}

function Inf(){
	if (document.getElementById('inf').innerHTML === " "){
		document.getElementById('inf').innerHTML="Screen Width: " + screen.width;
	}
	else{
		document.getElementById('inf').innerHTML=" ";
	}
	
}

function checkTime(i) {
	if (i < 10) {
		i="0" + i;
	}
	return i;
}

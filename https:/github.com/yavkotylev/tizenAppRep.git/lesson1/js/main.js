var startTime;
var checkTime;
var arrayBalls;
var arraySpeedX;
var arraySpeedY;
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


function drawChess(){
	var c=document.getElementById("chessTable");
	var ctx=c.getContext("2d");
	var flag = true;
	ctx.fillStyle = 'white';
	for (i = 0; i < 8; i++){
		
		for (j = 0; j < 8; j++){
			if (flag ==  true){
				ctx.fillStyle = 'white';
			}
			else{
				ctx.fillStyle = 'black';
			}
			flag = !flag;
			ctx.fillRect(i * 40, j * 40, 40 , 40);
		}
		flag = !flag;
	}
	ctx.stroke();
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




function circle(x, y, r) // класс задающий круг
{
    this.x = x; // координата х
    this.y = y; // координата у
    this.r = r; // радиус
    this.draw = function(color, globalAlpha) // метод рисующий круг
    {
        context.globalAlpha = globalAlpha; // "прозрачность"
        context.fillStyle = color; // цвет заливки
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        context.fill();
    };
}
function rect(x, y, width, height) // класс задающий прямоугольник
{
    this.x = x; // координата х
    this.y = y; // координата у
    this.width = width; // ширина
    this.height = height; // высота
    this.draw = function(color, globalAlpha) // функция рисует прямоугольник согласно заданным параметрам
    {
        context.globalAlpha = globalAlpha;
        context.fillStyle = color;
        context.fillRect(this.x, this.y, this.width, this.height);
    };
}
function update() // изменения координат которые нужно произвести
{
	
	for (i = 0; i < 4; i++){
		if (arrayBalls[i].y - arrayBalls[i].r < 0 || arrayBalls[i].y + arrayBalls[i].r > 320) // соприкосновение с "полом" и "потолком" холста
	    {
			arraySpeedY[i] = -arraySpeedY[i];
	    }
	    if (arrayBalls[i].x - arrayBalls[i].r < 0 || arrayBalls[i].x + arrayBalls[i].r > 320) // соприкосновение с левой и правй "стенкой" холста 
	    {
	    	arraySpeedX[i] = -arraySpeedX[i];
	    }
	    // приращение координат
	    arrayBalls[i].x += arraySpeedX[i];
	    arrayBalls[i].y += arraySpeedY[i];
	}
	
	
 
}
function drawAll() // рисуем на холсте
{
	for (i = 0; i < 4; i++){
		arrayBalls[i].draw("#f00", 1);
	}
    game.draw("#000", 0.1); // рисуем фон
    update(); // обновляем координаты
}


function initCanvas() // Инициализация переменных
{
    game = new rect(0, 0, 320, 320); // прямоугольник закрашивающий фон
    ball = new circle(game.width/3, game.height/2, 10); // шар
    arrayBalls = [new circle(game.width/4, game.height/11, 10), new circle(game.width/4, game.height/16, 10), new circle(game.width/4, game.height/7, 10), new circle(game.width/4, game.height/11, 10)];
    vX = 5; // скорость шара по оси х
    vY = 5; // скорость шара по оси у
    arraySpeedX = [5, 6, 4, 2];
    arraySpeedY = [6, 4, 5, 8];
    var canvas = document.getElementById("runningBallCanvas");
    canvas.width = game.width; // ширина холста
    canvas.height = game.height; // высота холста
    context = canvas.getContext("2d");
    setInterval(drawAll, 1000 / 50); //отрисовываем 50 раз за секунду
}




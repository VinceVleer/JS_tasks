'use strict'

var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
var fps = 30;

//enemies---------------------------------------------------

var enemies = createEnemyArray(); 
function createEnemyArray(enemyArray){

	var id = 0;
	var enemyArray = [];

	//create 55 enemies
	while (id < 55) {
		enemyArray.push({
			id: id, x: 40 * id, y: 16, width: 32, height: 16
		})
		id++
	}

	//transform 2nd row
	for(var i = 11; i < 22; i++) {
		enemyArray[i].y += 32;
		enemyArray[i].x -= 440;
	}

	//transform 3d row
	for(var i = 22; i < 33; i++) {
		enemyArray[i].y += 64;
		enemyArray[i].x -= 880;
	}

	//transform 4th row
	for(var i = 33; i < 44; i++) {
		enemyArray[i].y += 96;
		enemyArray[i].x -= 1320;
	}

	//transform 5th row
	for(var i = 44; i < 55; i++) {
		enemyArray[i].y += 128;
		enemyArray[i].x -= 1760;
	}

	return enemyArray;
}

var enemyDirection = true;
var enemyOffsetX = 0;
var enemyOffsetY = 0;

function updateEnemies(){

//ping-pong--------------------------

	//increment X+ value while moving to the right
	if (enemyDirection == true) {
		enemyOffsetX++
	};

	//increment X- value while moving to the left
	if (enemyDirection == false) {
		enemyOffsetX--
	};

	//increment Y- value when max X value is reached
	//& reverse X direction
	if (enemyOffsetX == 5 * fps) {
		enemyDirection = !enemyDirection;
		enemyOffsetY++;

		for(var i = 0; i < enemies.length; i++) {
			enemies[i].y += 32;
		}
	};

	//increment Y- value when min X value is reached
	//& reverse X direction
	if (enemyOffsetX == 0) {
		enemyDirection = !enemyDirection;
		enemyOffsetY++;

		for(var i = 0; i < enemies.length; i++) {
			enemies[i].y += 32;
		}
	};

//update enemy x values--------------------------

	//move all enemies along the X axis
	if (enemyDirection == true) {
		for(var i = 0; i < enemies.length; i++) {
			enemies[i].x += 40/fps;
		}
	} else {
		for(var i = 0; i < enemies.length; i++) {
		enemies[i].x -= 40/fps;
		}
	}
	renderEnemies();
}

function collision () {

	for(var i = 0 ; i < enemies.length ; i++) {
		if (
			((enemies[i].y + enemies[i].height) < (bulletY)) ||
			(enemies[i].y > (bulletY + bulletH)) ||
			((enemies[i].x + enemies[i].width) < bulletX) ||
			(enemies[i].x > (bulletX + bulletW))
		) {	}
		else {
			// console.log('destroyed enemy #' + i)
			enemies.splice(i,1);
			trigger = false;
		}
	}
}

function renderEnemies(){
	c.clearRect(0, 0, canvas.width, canvas.height);

	for(var i = 0; i < enemies.length; i++) {
		c.fillStyle = "#FF00FF";
		c.fillRect(enemies[i].x + 4, enemies[i].y, enemies[i].width, enemies[i].height);
	}

}

//enemies---------------------------------------------------


//player---------------------------------------------------

var playerX = 324;
var playerY = 448;
var playerSpeed = 40;

function player() {
	//create player rectangle
	c.fillStyle = "#FF0000";
	c.fillRect(playerX,playerY,32,16);
}

//player---------------------------------------------------


//bullet-----------------------------------------

var trigger = false;
var bulletX = 0;
var bulletY = playerY;
var bulletW = 2;
var bulletH = 16;

function shoot () {
	bulletY-=10;
	c.fillStyle = "#000";
	c.fillRect(bulletX,bulletY,bulletW,bulletH);
	if (bulletY < 0) {
		trigger = false;
	}
	collision();
}

//bullet-----------------------------------------


//input-----------------------------------------

//keyboard input
window.addEventListener("keydown", moveSomething);

function moveSomething(e) {
	switch(e.keyCode) {
		case 37:
			if (playerX > 4) {
				playerX -= playerSpeed;
			}
			break;
		case 39:
			if (playerX < 600){
				playerX += playerSpeed;
			}
			break;
		case 32:
			if (trigger == false) {
				trigger = true;
				bulletY = playerY;
				bulletX = playerX + 14;
			}
			break;
	}
}

//input-----------------------------------------


//score-----------------------------------------

var score = 0;
var win = false;
var lose = false;

function displayScore(){
	score = 55-enemies.length;
	//score text
	c.fillStyle = "#000000";
	c.font = "30px Arial";
	c.fillText("SCORE " + (55-enemies.length),50,50);

	if (score === 55) {
		win = true;
	}

	if (enemyOffsetY === 14) {
		lose = true;
	}
}

function endGame (){
	//win text
	c.clearRect(0, 0, canvas.width, canvas.height);
	c.fillStyle = "#000000";
	c.font = "30px Arial";
	c.fillText("YOU WIN",250,240);
}

function gameOver(){
	//lose text
	c.clearRect(0, 0, canvas.width, canvas.height);
	c.fillStyle = "#000000";
	c.font = "30px Arial";
	c.fillText("YOU LOSE",250,240);
}

//score-----------------------------------------


//execute functions -----------------------------------------

function update(){
	if (win == false)
		{
			updateEnemies();
			player();
			if (trigger == true) {
				shoot();
			}
			displayScore();
		} 
	else
		{
			endGame();
		}

	if (lose == true)
		{
			gameOver();
		}
}

setInterval(update, 1000/fps);

//execute functions -----------------------------------------

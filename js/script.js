//set up the canvas
var stage = document.getElementById("gameCanvas");
stage.width = STAGE_Width;
stage.height = STAGE_HEIGHT;
var ctx = stage.getContext("2d");

var state = "game";

class Tank {
	constructor(x, y, hp, speed, baseDmg) {
		this.x = x;
		this.y = y;
		this.hp = hp; // hp, speed, and baseDmg could be constants
		this.speed = speed;
		this.baseDmg = baseDmg;
		this.dx = 0.0; // dx and dy are the coordinates of a normal vector
		this.dy = 0.0;
	}

	input() {
		this.dy = 0.0;
		this.dx = 0.0;
		if (keysDown[0] == true) {//w
			this.dy = -1.0;
		}
		if (keysDown[1] == true) {//a
			this.dx = -1.0;
		}
		if (keysDown[2] == true) {//s
			this.dy = 1.0;
		}
		if (keysDown[3] == true) {//d
			this.dx = 1.0;
		}
		if (this.dx != 0.0 && this.dy != 0.0) { //normalizes the direction vector
			var magnitude = Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
			this.dx /= magnitude;
			this.dy /= magnitude;
		}
	}

	collide() {// handles all collisions with the tank
		//collision with stage boundaries
		if (this.x > stage.width - tankSize) {
			this.x = stage.width - tankSize;
		} else if (this.x < 0) {
			this.x = 0;
		}
		if (this.y > stage.height - tankSize) {
			this.y = stage.height - tankSize;
		} else if (this.y < 0) {
			this.y = 0;
		}
	}

	updatePosition() {
		this.input();
		//moves tank by the vector this.speed*<dx, dy>
		this.x += this.dx * this.speed;
		this.y += this.dy * this.speed;
		this.collide();
	}

	shoot(weapon, dx, dy) {
		//creates an object of the specific weapon type that is added to the projectile array
	}

	draw() {
		ctx.fillStyle = "green";
		ctx.fillRect(this.x, this.y, tankSize, tankSize);
	}
}

let player = new Tank(20, 20, 5, 5, 5);

class AI extends Tank {
	constructor(difficulty) {
		this.difficulty = difficulty;
	}
}

// the game object, it has a render and update function
var game = {
	update : function() {
		player.updatePosition();
	},

	render : function() {
		ctx.fillStyle = "grey";
		ctx.fillRect(0, 0, stage.width, stage.height);
		player.draw();
	}
}

var main = function () {
	//"state machine"
	switch(state) {
		case "game":
			game.update();
			game.render();
		break;
		case "menu":
		break;
		default:
		alert("state not found");
	}
	//important
	requestAnimationFrame(main);
}

var keysDown = {};

window.addEventListener("keydown", function(event) {
	if (event.defaultPrevented) {
		return; // Do nothing if event already handled
	}
  
	switch(event.code) {// flips a specific boolean in the keysDown array for each key until it is unpressed
		case "KeyW":
			keysDown[0] = true;
			break;
		case "KeyA":
			keysDown[1] = true;
			break;
		case "KeyS":
			keysDown[2] = true;
			break;
		case "KeyD":
			keysDown[3] = true;
			break;
	}
  
	// Consume the event so it doesn't get handled twice
	event.preventDefault();
}, true);

window.addEventListener("keyup", function(event) {
	if (event.defaultPrevented) {
		return; // Do nothing if event already handled
	}

	switch(event.code) {
		case "KeyW":
			keysDown[0] = false;
			break;
		case "KeyA":
			keysDown[1] = false;
			break;
		case "KeyS":
			keysDown[2] = false;
			break;
		case "KeyD":
			keysDown[3] = false;
			break;
	}

	// Consume the event so it doesn't get handled twice
	event.preventDefault();
}, true);

//addEventListener("click", click, false);

main();

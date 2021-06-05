//set up the canvas
var stage = document.getElementById("gameCanvas");
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;
var ctx = stage.getContext("2d");

var state = "game";

class PhysicsRect {
	constructor(x, y, w, h, dx, dy) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.dx = dx;
		this.dy = dy;
	}
	
	update() {
		x += dx;
		y += dy;
		// this collisions stuff isn't done the proper way
		if (x > stage.width - width) {
			x = stage.width - width;
		} else if (x < 0) {
			x = 0;
		}
		if (y > stage.height - height) {
			y = stage.height - height;
		} else if (y < 0) {
			y = 0;
		}
	}
}

class Tank {
	constructor(x, y, hp, speed, baseDmg) {
		hitbox = new PhysicsRect(x, y, tankSize, tankSize, 0, 0);
		this.hp = hp; // hp, speed, and baseDmg could be constants
		this.speed = speed;
		this.baseDmg = baseDmg;
	}

	update() {
		hitbox.dy = 0.0;
		hitbox.dx = 0.0;
		if (keysDown[0] == true) {//w
			hitbox.dy = -1.0;
		}
		if (keysDown[1] == true) {//a
			hitbox.dx = -1.0;
		}
		if (keysDown[2] == true) {//s
			hitbox.dy = 1.0;
		}
		if (keysDown[3] == true) {//d
			hitbox.dx = 1.0;
		}
		if (hitbox.dx != 0.0 && hitbox.dy != 0.0) { //normalizes the direction vector
			var magnitude = Math.sqrt(Math.pow(hitbox.dx, 2) + Math.pow(hitbox.dy, 2));
			hitbox.dx /= magnitude;
			hitbox.dy /= magnitude;
		}
		hitbox.update();
	}

	shoot(weapon, dx, dy) {
		//creates an object of the specific weapon type that is added to the projectile array
	}

	draw() {
		ctx.fillStyle = "green";
		ctx.fillRect(this.x, this.y, tankSize, tankSize);
	}
}

class Projectile {
	constructor(x, y, dx, dy) {
		hitbox = new PhysicsRect(x, y, 10, 10, dx, dy);
	}

	update() {
		hitbox.update();
	}
}

let player = new Tank(20, 20, 5, 5, 5);

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

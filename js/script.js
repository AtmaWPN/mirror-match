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
		this.hp = hp;
		this.speed = speed;
		this.baseDmg = baseDmg;
	}

	//moves tank by the vector this.speed*<dx, dy>
	//this is probably where collision code for the tanks will be
	move(dx, dy) {
		this.x += dx * this.speed;
		this.y += dy * this.speed;
	}

	shoot() {
		//I don't know whether to have separate methods for each weapon or one method with a switch statement
	}

	draw() {
		ctx.fillStyle = "green";
		ctx.fillRect(this.x, this.y, tankSize, tankSize);
	}
}

let player = new Tank(20, 20, 20, 5, 5);

class AI extends Tank {
	constructor(difficulty) {
		this.difficulty = difficulty;
	}

	moveTo(x, y) {

	}
}

// the game object, it has a render and update function
var game = {
	update : function() {
		
	},

	render : function() {
		player.draw();
	}
}

var main = function () {
	//test code
	ctx.fillStyle = "black";
	ctx.fillRect(10, 10, 10, 10);
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

main();
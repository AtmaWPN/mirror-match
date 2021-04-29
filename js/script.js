//set up the canvas
var stage = document.getElementById("gameCanvas");
stage.width = 900;
stage.height = 600;
var ctx = stage.getContext("2d");
alert();
var main = function () {
	//test code
	ctx.fillStyle = "black";
	ctx.fillRect(10, 10, 10, 10);
	//"state machine"
	switch(state) {
		case "game":
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
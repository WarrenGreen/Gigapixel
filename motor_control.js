var gpio = require("pi-gpio");

const RADIANS_PER_SECOND 	= 0.04,
	  LEFT_PIN 			  	= 0,
	  UP_PIN 				= 1,
	  RIGHT_PIN 			= 2,
	  DOWN_PIN 			  	= 3,
	  HORIZ_DEG_PER_SECOND 	= 10,
	  VERT_DEG_PER_SECOND 	= 10,
	  DEFAULT_MOVEMENT_SIZE = 10;

module.exports = {
	this.LEFT 	= "left";
	this.UP 	= "up";
	this.RIGHT 	= "right";
	this.DOWN 	= "down";

	this.pos = {x:0, y:0};

	move: function (degs, direction) {
		switch (direction) {
			case LEFT:
				left(degs);
				break;
			case RIGHT:
				right(degs);
				break;
			case UP:
				up(degs);
				break;
			case DOWN:
				down(degs);
				break;
		}
	}
}

function left(degs) {
	pos.x -= degs;

	gpio.open(LEFT_PIN, "output", function(err) {
		gpio.write(LEFT_PIN, 1, function() {
			gpio.close(LEFT_PIN); 
		});
	});
	setTimeout(stop(), getMovementTime(degs))
}

function right(degs) {
	pos.x += degs;

	gpio.open(RIGHT_PIN, "output", function(err) {
		gpio.write(RIGHT_PIN, 1, function() {
			gpio.close(RIGHT_PIN);
		});
	});

	setTimeout(stop(), getMovementTime(degs))
}

function down(degs) {
	pos.y -= degs;

	gpio.open(DOWN_PIN, "output", function(err) {
		gpio.write(DOWN_PIN, 1, function() {
			gpio.close(DOWN_PIN);
		});
	});

	setTimeout(stop(), getMovementTime(degs))
}

function up(degs) {
	pos.y += degs;

	gpio.open(UP_PIN, "output", function(err) {
		gpio.write(UP_PIN, 1, function() {
			gpio.close(UP_PIN);
		});
	});

	setTimeout(stop(), getMovementTime(degs))
}

function stop() {
	gpio.open(LEFT_PIN, "output", function(err) {
		gpio.write(LEFT_PIN, 0, function() {
			gpio.close(LEFT_PIN);
		});
	});

	gpio.open(RIGHT_PIN, "output", function(err) {
		gpio.write(LEFT_PIN, 0, function() {
			gpio.close(LEFT_PIN);
		});
	});

	gpio.open(DOWN_PIN, "output", function(err) {
		gpio.write(LEFT_PIN, 0, function() {
			gpio.close(LEFT_PIN);
		});
	});

	gpio.open(UP_PIN, "output", function(err) {
		gpio.write(LEFT_PIN, 0, function() {
			gpio.close(LEFT_PIN);
		});
	});

}

function getHorizMovementTime(degs) {
	return 1 / HORIZ_DEG_PER_SECOND * degs;
}

function getVertMovementTime(degs) {
	return 1 / VERT_DEG_PER_SECOND * degs;
}

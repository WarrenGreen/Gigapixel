var motorControl = require('./motor_control.js');

var startPos = {x:0, y:0},
	stopPos  = {x:0, y:0};

const FF_SENSOR_WIDTH  = 36,
	  FF_SENSOR_HEIGHT = 24,
	  NIKON_CROP_SENSOR_WIDTH  = 23.60,
	  NIKON_CROP_SENSOR_HEIGHT = 15.60;

var camFocalLength = 50;

module.exports = {
	setStart: function () {
		setStart(motorControl.pos.x, motorControl.pos.y);
	},

	setStart: function (x, y) {
		startPos.x = x;
		startPos.y = y;
	},

	setStop: function () {
		setStop(motorControl.pos.x, motorControl.pos.y);
	},

	setStop: function (x, y) {
		stopPos.x = x;
		stopPos.y = y;
	},

	start: function () {
		gigapan();
	}

}

function gigapan() {
	while (!done()) {

		//todo: take photo

		if (motorControl.pos.x < stopPos.x) {
			motorControl.move(getHorizontalFoV(camFocalLength) * 0.4, motorControl.RIGHT); //move by just under current FoV
		} else if (motorControl.pos.y < stopPos.y) {
			motorControl.move(getVerticalFoV(camFocalLength) * 0.4, motorControl.DOWN); //move by just under current FoV
			motorControl.move(Math.abs(motorControl.pos.x - stopPos.x), motorControl.LEFT);
		}
	}
}

function done() {
	if (motorControl.pos.x < stopPos.x || motorControl.pos.y < stopPos.y) {
		return false;
	} else {
		return true;
	}
}

function radToDeg(radians) {
	var ratio = 180/Math.PI;
	return radians * ratio;
}

function getHorizontalFoV(focalLength) {
	return radToDeg(2 * Math.atan((0.5 * FF_SENSOR_WIDTH) / focalLength));
}

function getVerticalFoV(focalLength) {
	return radToDeg(2 * Math.atan((0.5 * FF_SENSOR_HEIGHT) / focalLength));
}
var motorControl = require('./motor_control.js');

var startPos = {x:0, y:0},
	stopPos  = {x:0, y:0};

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

	radToDeg: function (radians) {
		var ratio = 180/Math.PI;
		return radians * ratio;
	}
}
var http = require('http');
var url = require('url');
var motorControl = require('./motor_control.js');
var gigapixel = require('./gigapixel.js');

const PORT=8080;
const 	API_MOVE_LEFT 	= "/api/move_left",
		API_MOVE_RIGHT 	= "/api/move_right",
		API_MOVE_DOWN	= "/api/move_down",
		API_MOVE_UP		= "/api/move_up",
		API_SET_START	= "/api/set_start",
		API_SET_END		= "/api/set_end";

function handleRequest(request, response){
    var parsedUrl = url.parse(request.url, true);
    console.log("Received request: " + parsedUrl.path);

    switch (parsedUrl.pathname) {
    	case API_MOVE_LEFT:
    		motorControl.move(motorControl.DEFAULT_MOVEMENT_SIZE, motorControl.LEFT);
    		break;
    	case API_MOVE_RIGHT:
    		motorControl.right(motorControl.DEFAULT_MOVEMENT_SIZE, motorControl.RIGHT);
    		break;
    	case API_MOVE_UP:
    		motorControl.up(motorControl.DEFAULT_MOVEMENT_SIZE, motorControl.UP);
    		break;
    	case API_MOVE_DOWN:
    		motorControl.down(motorControl.DEFAULT_MOVEMENT_SIZE, motorControl.DOWN);
    		break;
    	case API_SET_START:
    		gigapixel.setStart();
    		break;
    	case API_SET_END:
    		gigapixel.setStop();
    		break;
    }
    response.end();
}

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
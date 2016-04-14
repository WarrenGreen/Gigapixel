var gphoto2 = require('gphoto2');
var GPhoto = new gphoto2.GPhoto2();

var camera = null;

function init() {
	GPhoto.list(function (list) {
	if (list.length === 0) return;
	camera = list[0];
  console.log('Found', camera.model);
 
  // get configuration tree 
  camera.getConfig(function (er, settings) {
    console.log(settings);
  });
 
  // Set configuration values 
  camera.setConfigValue('capturetarget', 1, function (er) {
    //... 
  });
}

function takePhoto() {
	camera.takePicture({download: false}, function (er, path) {
    console.log(path);
  });
}
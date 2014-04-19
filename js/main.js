

var WIDTH = 400;
var HEIGHT = 300;

var VIEW_ANGLE = 45;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 0.1;
var FAR = 10000.0;

var ENABLE_SHADOWS = false;

var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene();
var axis = new THREE.AxisHelper(10.0);

renderer.shadowMapEnabled = ENABLE_SHADOWS;

scene.add(axis);

renderer.setSize(WIDTH, HEIGHT);

var camera = new THREE.PerspectiveCamera(
	VIEW_ANGLE,
	ASPECT,
	NEAR,
	FAR
);

var controls = new THREE.OrbitControls(camera, renderer.domElement);

camera.position.y = 100;
camera.position.z = 200;

controls.update();

document.body.appendChild(renderer.domElement);

var ambient = new THREE.AmbientLight(0x101010);

var spotlight = new THREE.SpotLight(0xFFFFFFFF, 10.0, 1500.0);

spotlight.position.y = 50;

spotlight.shadowMapWidth = 1024;
spotlight.shadowMapHeight = 1024;

spotlight.shadowCameraNear = 500;
spotlight.shadowCameraFar = 4000;
spotlight.shadowCameraFov = 30;

var light = new THREE.PointLight(0xFFFFFFFF, 1.0, 750.0);
var sphere = make_sphere(5.0);

scene.add(ambient);
scene.add(light);
scene.add(spotlight);
scene.add(sphere);
scene.add(camera);

if ( ENABLE_SHADOWS )
{
	scene.traverse(function(object) { 
		object.castShadow = true;
		object.receiveShadow = true;
	});
}

add_spiral(scene, 12, 50.0);

var floor = make_floor(200.0);
var walls = make_walls(2500.0);

scene.add(floor);
scene.add(walls);

function render(time)
{
	sphere.position.x = Math.cos(time * 0.001) * 20.0;
	sphere.position.y = 25.0;
	sphere.position.z = Math.sin(time * 0.001) * 20.0;

	light.position = sphere.position;

	//camera.position.z = 2;
	//camera.position.y += 1;
	
	//camera.lookAt(new THREE.Vector3(0,0,0));
	//camera.updateProjectionMatrix();

	renderer.render(scene, camera);
	window.requestAnimationFrame(render);
};

window.requestAnimationFrame = 
	window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.msRequestAnimationFrame;

window.requestAnimationFrame(render);
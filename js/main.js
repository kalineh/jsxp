

var WIDTH = 400;
var HEIGHT = 300;

var VIEW_ANGLE = 45;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 0.1;
var FAR = 10000.0;

var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera(
	VIEW_ANGLE,
	ASPECT,
	NEAR,
	FAR
);

var scene = new THREE.Scene();

scene.add(camera);

renderer.setSize(WIDTH, HEIGHT);

document.body.appendChild(renderer.domElement);

var radius = 2;
var segments = 16;
var rings = 16;

var geom = new THREE.SphereGeometry(radius, segments, rings);
var material = new THREE.MeshLambertMaterial({ color: 0xCC0000CC });
var sphere = new THREE.Mesh(geom, material);

scene.add(sphere);

var light = new THREE.PointLight(0xFFFFFFFF);

light.position.x = 0;
light.position.y = 50;
light.position.z = 130;

scene.add(light);

make_spiral(scene, 12, 100.0);
make_floor(scene, 100.0);

function render(time)
{
	//light.position.z += 91.0;

	sphere.position.x = Math.sin(time * 0.01) * 20.0;

	camera.position.z = 300;
	camera.position.y += 1;
	
	camera.lookAt(new THREE.Vector3(0,0,0));
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
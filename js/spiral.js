
var make_floor = function(size)
{
	var geom = new THREE.PlaneGeometry(size, size);
	var material = new THREE.MeshLambertMaterial({ color: 0xFFFFFFFF, side: THREE.DoubleSide });
	var plane = new THREE.Mesh(geom, material);

	plane.rotation.set(Math.PI * 0.5, 0.0, 0.0);

	plane.castShadow = ENABLE_SHADOWS;
	plane.receiveShadow = ENABLE_SHADOWS;

	return plane;
};

var make_walls = function(size)
{
	var geom = new THREE.CubeGeometry(size, size, size);
	var material = new THREE.MeshLambertMaterial({ color: 0x7F9F9F, side: THREE.DoubleSide });
	var cube = new THREE.Mesh(geom, material);

	cube.castShadow = ENABLE_SHADOWS;
	cube.receiveShadow = ENABLE_SHADOWS;

	return cube;
};

var make_sphere = function(size)
{
	var radius = size;
	var segments = 8;
	var rings = 8;

	var geom = new THREE.SphereGeometry(radius, segments, rings);
	var material = new THREE.MeshLambertMaterial({ color: 0xFFFFFFFF, side: THREE.DoubleSide });
	var sphere = new THREE.Mesh(geom, material);

	sphere.castShadow = ENABLE_SHADOWS;
	sphere.receiveShadow = ENABLE_SHADOWS;

	return sphere;
};

var add_spiral = function(scene, count, size)
{
	for (var i = 0; i < count; i++)
	{
		var z = size / count;
		var s = make_sphere(z);
		var t = 1.0 / count * i;
		var p = new THREE.Vector3(
			Math.cos(i * Math.PI) * size * t, 
			z,
			Math.cos(i * Math.PI) * size * t
		);
		var c = new THREE.Color(1.0 / count * i, 0.0, 1.0);

		s.position = p;
		s.material.color = c;

		scene.add(s)
	}
};



var make_floor = function(scene, size)
{
	var geom = new THREE.PlaneGeometry(size, size);
	var material = new THREE.MeshLambertMaterial({ color: 0x7F7F7F7F, side: THREE.DoubleSize });
	var plane = new THREE.Mesh(geom, material);

	scene.add(plane);
};

var make_sphere = function(index)
{
	var radius = 5;
	var segments = 8;
	var rings = 8;

	var geom = new THREE.SphereGeometry(radius, segments, rings);
	var material = new THREE.MeshLambertMaterial({ color: 0xCC0000CC });
	var sphere = new THREE.Mesh(geom, material);

	return sphere;
};

var make_spiral = function(scene, count, size)
{
	for (var i = 0; i < count; i++)
	{
		var s = make_sphere(i);
		var t = 1.0 / count * i;
		//var p = new THREE.Vector3(Math.cos(i * Math.PI) * size * t, Math.sin(i / Math.PI) * size * t, 0.0);
		var p = new THREE.Vector3(
			Math.cos(i * Math.PI) * size * t, 
			Math.cos(i * Math.PI) * size * t,
			0.0
		);
		var c = new THREE.Color(1.0 / count * i, 0.0, 1.0);

		s.position = p;
		s.material.color = c;

		scene.add(s)
	}
};


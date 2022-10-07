import { Scene, Color, Fog } from 'three';

const scene = new Scene();
scene.background = new Color('skyblue');
scene.fog = new Fog(0xe0e0e0, 20, 100);

const mScn = function (_t, _v) {
  return new mScn.fn.init(_t, _v);
};

mScn.fn = mScn.prototype = {
  constructor: mScn,

  ver: '22-0929-1541',
  length: 0,
  scene: scene
}

const init = mScn.fn.init = function (_t, _v) {
  if (!_t) { return this; }

  let _r;
  if (typeof _t === "string") { ///. 문자열을 나타낸다

  } else { ///. 배열을 나타낸다

  }

  return _r;
}

init.prototype = mScn.fn;

export { mScn };



// const textureLoader = new THREE.TextureLoader();
// const shaderPoint = THREE.ShaderLib.points;
// const uniforms = THREE.UniformsUtils.clone(shaderPoint.uniforms);
// uniforms.map.value = textureLoader.load(snowflakeTexture);
// for (let i = 0; i < 1000; i++) {
//   sparkGeometry.vertices.push(new THREE.Vector3());
// }
// const sparks = new THREE.Points(new THREE.Geometry(), new THREE.PointsMaterial({
//   size: 2,
//   color: new THREE.Color(0xffffff),
//   map: uniforms.map.value,
//   blending: THREE.AdditiveBlending,
//   depthWrite: false,
//   transparent: true,
//   opacity: 0.75
// }));
// sparks.scale.set(1, 1, 1);
// sparks.geometry.vertices.map(spark => {
//   spark.y = randnum(30, 40);
//   spark.x = randnum(-500, 500);
//   spark.z = randnum(-500, 500);
//   return true;
// });
// scene.add(sparks);
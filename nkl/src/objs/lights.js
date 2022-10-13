import { DirectionalLight, HemisphereLight, SpotLight } from 'three';

const ambientLight = new HemisphereLight('white', 'darkslategrey', 3.5);
const mainLight = new DirectionalLight('white', 4);
mainLight.position.set(0, 15, 0);
mainLight.castShadow = true;

mainLight.shadow.mapSize.width = 512;
mainLight.shadow.mapSize.height = 512;
mainLight.shadow.camera.near = 1;
mainLight.shadow.camera.far = 20;
mainLight.shadow.focus = 2; 


// mainLight.decay = 0.1;
// mainLight.distance = 100000;
// mainLight.shadow.bias = - 0.005; // reduces self-shadowing on double-sided objects
// mainLight.intensity = 1.2;
// mainLight.angle = 0.45;
// mainLight.penumbra = 0.3;

const spotLight = new SpotLight('white');
spotLight.position.set(12.5, 12.5, 12.5);
spotLight.intensity = 1.2;
spotLight.angle = 0.45;
spotLight.penumbra = 0.3;
// spotLight.castShadow = true;
// spotLight.shadow.mapSize.width = 1024;
// spotLight.shadow.mapSize.height = 1024;
// spotLight.shadow.camera.near = 5;
// spotLight.shadow.camera.far = 10;
// spotLight.shadow.focus =1;

const mLit = function (_t, _v) {
  return new mLit.fn.init(_t, _v);
};

mLit.fn = mLit.prototype = {
  constructor: mLit,

  ver: '22-0929-1541',
  length: 0,

  lights: () => {
    return { ambientLight, mainLight, spotLight };
  }
}

const init = mLit.fn.init = function (_t, _v) {
  if (!_t) { return this; }

  let _r;
  if (typeof selector === "string") { ///. 문자열을 나타낸다

  } else { ///. 배열을 나타낸다

  }

  return _r;
}

init.prototype = mLit.fn;

export { mLit };
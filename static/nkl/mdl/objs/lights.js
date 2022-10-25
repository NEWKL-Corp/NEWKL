import { DirectionalLight, HemisphereLight, SpotLight } from 'three';

const ambientLight = new HemisphereLight(0xffffff, 0x888888, 3.5); ///. sky color, ground color, intensity
const mainLight = new DirectionalLight(0xffffff, 3);
mainLight.position.set(0, 32, 0);
// mainLight.target.position.set(0, 0, 0);
mainLight.castShadow = true;
mainLight.shadow.camera.top = 32;
mainLight.shadow.camera.bottom = -32;
mainLight.shadow.camera.left = -32;
mainLight.shadow.camera.right = 32;

mainLight.shadow.mapSize.width = 1024;
mainLight.shadow.mapSize.height = 1024;
mainLight.shadow.camera.near = 8;
mainLight.shadow.camera.far = 33;
// mainLight.shadow.focus = 2;

// mainLight.decay = 0.1;
// mainLight.distance = 100000;
// mainLight.shadow.bias = - 0.005; // reduces self-shadowing on double-sided objects
// mainLight.intensity = 1.2;
// mainLight.angle = 0.45;
// mainLight.penumbra = 0.3;

const spotLight = new SpotLight('white',);
spotLight.position.set(0, 8, 0);
// spotLight.target.position.set(0, 0, 0);
spotLight.intensity = 3;
spotLight.angle = 1.0;
// spotLight.penumbra = 0.3;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 512;
spotLight.shadow.mapSize.height = 512;
spotLight.shadow.camera.near = 5;
spotLight.shadow.camera.far = 9;
// spotLight.shadow.focus = 0.5;

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
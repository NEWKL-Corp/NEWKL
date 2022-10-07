import { DirectionalLight, HemisphereLight, SpotLight } from 'three';

const ambientLight = new HemisphereLight('white', 'darkslategrey', 5,);
const mainLight = new DirectionalLight('white', 4);
mainLight.position.set(10, 10, 10);

const spotLight = new SpotLight();
spotLight.position.set(12.5, 12.5, 12.5);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

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
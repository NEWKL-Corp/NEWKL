import { PerspectiveCamera, Vector3 } from 'three';

const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 250);
camera.position.set(0, 0, 5);
camera.lookAt(new Vector3(0, 2, 0));

const mCmr = function (_t, _v) {
  return new mCmr.fn.init(_t, _v);
};

mCmr.fn = mCmr.prototype = {
  constructor: mCmr,

  ver: '22-0929-1541',
  length: 0,
  camera: camera
}

const init = mCmr.fn.init = function (_t, _v) {
  if (!_t) { return this; }

  let _r;
  if (typeof _t === "string") { ///. 문자열을 나타낸다

  } else { ///. 배열을 나타낸다

  }

  return _r;
}

init.prototype = mCmr.fn;

export { mCmr };
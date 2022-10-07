import { WebGLRenderer, sRGBEncoding } from 'three';


const renderer = new WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.outputEncoding = sRGBEncoding;
renderer.physicallyCorrectLights = true;

const mRrr = function (_t, _v) {
  return new mRrr.fn.init(_t, _v);
};

mRrr.fn = mRrr.prototype = {
  constructor: mRrr,

  ver: '22-0929-1541',
  length: 0,
  renderer: renderer
}

const init = mRrr.fn.init = function (_t, _v) {
  if (!_t) { return this; }

  let _r;
  if (typeof _t === "string") { ///. 문자열을 나타낸다

  } else { ///. 배열을 나타낸다

  }

  return _r;
}

init.prototype = mRrr.fn;

export { mRrr };

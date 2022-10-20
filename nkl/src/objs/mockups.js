import { GridHelper, AxesHelper, ArrowHelper, CameraHelper, PlaneGeometry, Mesh, MeshPhongMaterial, Vector3 } from 'three';

let _n = 1
const arrowHelper = new ArrowHelper(new Vector3([1, 2, 0]), new Vector3([0, 0, 0]), _n, 0xffff00, 0.5 * _n, 0.2 * _n);

const mMkp = function (_t, _v) {
  return new mMkp.fn.init(_t, _v);
};

mMkp.fn = mMkp.prototype = {
  constructor: mMkp,

  ver: '22-0929-1541',
  length: 0,

  groundHelper: (_v) => {
    const _r = new Mesh(new PlaneGeometry(_v[0], _v[0]), new MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
    _r.rotation.x = - Math.PI / 2;
    _r.receiveShadow = true;
    _r.name = 'groundHelper';

    return _r
  },

  gridHelper: (_v) => {
    let _r = new GridHelper(_v[0], _v[1], 0x000000, 0x000000);
    _r.material.opacity = 0.2;
    _r.material.transparent = true;

    return _r;
  },

  axesHelper: (_v) => { return new AxesHelper(_v[0]); }, 

  arrowHelper: arrowHelper,

  cameraHelper: (_c) => { return new CameraHelper(_c); }
}

const init = mMkp.fn.init = function (_t, _v) {
  if (!_t) { return this; }

  let _r;
  if (typeof selector === "string") { ///. 문자열을 나타낸다

  } else { ///. 배열을 나타낸다

  }

  return _r;
}

init.prototype = mMkp.fn;

export { mMkp };
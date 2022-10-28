import { TextureLoader, MeshPhongMaterial, MeshBasicMaterial } from 'three';

import { mMdl } from './models.js';

const textures = {};
const materials = {};

const mTxr = function (_t, _v) {
  return new mTxr.fn.init(_t, _v);
};

mTxr.fn = mTxr.prototype = {
  constructor: mTxr,

  ver: '22-0929-1541',
  length: 0,

  load: async (_f, _t) => { ///. file url, texture name
    let _r;

    const loader = new TextureLoader();
    let _i = await loader.loadAsync(_f);

    _r = set(_i, _t);
    return _r;
  },

  map: (_n, _t, _i) => { ///. obj name, texture name
    map(_n, _t, _i);
  }
}

const init = mTxr.fn.init = function (_t, _v) {
  if (!_t) { return this; }

  let _r;
  if (typeof _t === "string") { ///. 문자열을 나타낸다

  } else { ///. 배열을 나타낸다

  }

  return _r;
}

init.prototype = mTxr.fn;

function map(_n, _t, _i) { ///. name obj, type obj, name image(texture)
  let _o = mMdl()[_t][_n].model;
  _o.traverse((node) => {
    if (node.isMesh) {
      node.material = materials[_i];
    }
  });
}

function set(_i, _t) { ///. image(texture), obj name
  _i.flipY = false;
  // _i.encoding = THREE.sRGBEncoding;

  let _r = new MeshBasicMaterial({
    map: _i,
    color: 0xcccccc
  });

  textures[_t] = _i;
  materials[_t] = _r;

  return _r;
}

export { mTxr };
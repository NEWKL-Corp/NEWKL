import { TextureLoader, SpriteMaterial, Sprite, Vector3 } from 'three';

import { mCmr } from '../objs/cameras.js';

const spriteMaterials = {};
const sprites = {};

const mSpr = function (_t, _v) {
  return new mSpr.fn.init(_t, _v);
};

mSpr.fn = mSpr.prototype = {
  constructor: mSpr,

  ver: '22-0929-1541',
  length: 0,

  load: async (_f, _p, _s, _c, _t) => { ///. file, [x, y, z] position, [w, h] scale, [h, v] coordinate, name Material
    let _r;

    const loader = new TextureLoader();

    let _i = await loader.loadAsync(_f);

    _r = set(_i, _p, _s, _c, _t);

    return _r;
  }
}

const init = mSpr.fn.init = function (_t, _v) {
  if (!_t) { return this; }

  let _r;
  if (typeof selector === "string") { ///. 문자열을 나타낸다

  } else { ///. 배열을 나타낸다

  }

  return _r;
}

init.prototype = mSpr.fn;

function set(_i, _p, _s, _c, _t) { ///. image, [x, y, z] position, [w, h] scale, [h, v] coordinate, name Material

  _i.repeat.set(1 / _c[0], 1 / _c[1]);
  spriteMaterials[_t] = new SpriteMaterial({ map: _i });

  let _r = sprites[_t] = new Sprite(spriteMaterials[_t]);
  _r.center.set(0.5, 0.0);
  _r.scale.set(_s[0], _s[1], 1);
  // _r.castShadow = true;
  _r.name = _t;

  _c = mCmr().camera;
  let _v = new Vector3(0, 5, 0);
  _v.applyQuaternion(_c.quaternion); ///. 항상 카메라를 바라보게 나타낸다
  _r.position.copy(_v);

  return _r;
}

export { mSpr };
import { Raycaster, Matrix3, Vector3 } from 'three';

import { OrbitControls } from 'OrbitControls';

import { mCmr } from '../../src/objs/cameras.js';
import { mScn } from '../../src/objs/scene.js';
import { mMkp } from '../../src/objs/mockups.js';
import { mMdl } from '../../src/objs/models.js';

import { mRrr } from '../../src/views/renderer.js';

const raycaster = new Raycaster();
const pickPos = new Vector3();

const mCtrl = function (_t, _v) {
  return new mCtrl.fn.init(_t, _v);
};

mCtrl.fn = mCtrl.prototype = {
  constructor: mCtrl,

  ver: '22-0929-1541',
  length: 0,

  Orbit: (_c, canvas) => {
    const _r = new OrbitControls(_c, canvas);
    _r.enableDamping = true;
    _r.tick = () => _r.update();

    return _r;
  },

  joystick: () => { joystick() },

  pick: () => { }

}

const init = mCtrl.fn.init = function (_t, _v) {
  if (!_t) { return this; }

  let _r;
  if (typeof _t === "string") { ///. 문자열을 나타낸다

  } else { ///. 배열을 나타낸다

  }

  return _r;
}

init.prototype = mCtrl.fn;

mRrr().renderer.domElement.addEventListener('click', onMouseClick, false);
// mRrr().renderer.domElement.addEventListener('mousemove', onMouseMove, false);

function onMouseClick(e) {
  const _p = {
    x: (e.clientX / mRrr().renderer.domElement.clientWidth) * 2 - 1,
    y: -(e.clientY / mRrr().renderer.domElement.clientHeight) * 2 + 1,
  }

  raycaster.setFromCamera(_p, mCmr().camera);

  const intersects = raycaster.intersectObjects(mScn().scene.children, true);

  if (intersects[0]) {
    for (let i = 0; i < intersects.length; i++) {
      console.log(intersects[i].object.name);
      if (intersects[i].object.name === 'groundHelper') { ///. null 제외를 나타낸다

        let face = intersects[i].face;
        let point = intersects[i].point; ///. Vector3
        let object = intersects[i].object;

        mMkp().arrowHelper.position.copy(point);
        let normalMatrix = new Matrix3().getNormalMatrix(object.matrixWorld);
        let normal = face.normal.clone().applyMatrix3(normalMatrix).normalize();
        mMkp().arrowHelper.setDirection(normal);
        pickPos.copy(point);

        let _m = mMdl().players['RootNode'];
        let _p = new Vector3(intersects[i].point.x, _m.model.position.y, intersects[i].point.z);
        if (!_m.movements.length) { _m.deltaMove = undefined; }
        _m.movements.push(_p);

        // break;
      }
    }
  }
}

const joystick = () => {

}

export { mCtrl };
import { Raycaster, Matrix3, Vector3, Vector2 } from 'three';

import { OrbitControls } from 'OrbitControls';

import { mCmr } from '../objs/cameras.js';
import { mScn } from '../objs/scene.js';
import { mMkp } from '../objs/mockups.js';
import { mMdl } from '../objs/models.js';

import { mRrr } from './renderer.js';

const raycaster = new Raycaster();
let orbit;

let pickPos = new Vector3(); ///. 그라운드 픽 위치를 나타낸다

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
console.log('///. Mob: ' + isMobile);

const stick = {
  size: 1,
  walking: 2.00,
  runing: 4.00,
};
stick.size = isMobile ? 2 : 1;


const mCtrl = function (_t, _v) {
  return new mCtrl.fn.init(_t, _v);
};

mCtrl.fn = mCtrl.prototype = {
  constructor: mCtrl,

  ver: '22-0929-1541',
  length: 0,

  orbit: (_c, canvas) => {
    let _r = orbit = new OrbitControls(_c, canvas);

    _r.maxDistance = 45;
    _r.minDistance = 25;
    //_r.maxPolarAngle = (Math.PI / 4) * 3;
    _r.maxPolarAngle = Math.PI / 2; ///. H radians 90
    _r.minPolarAngle = 0; ///. H radians 90
    _r.autoRotate = false;
    _r.autoRotateSpeed = 0;
    _r.rotateSpeed = 0.4;
    _r.enableDamping = false;
    _r.dampingFactor = 0.1;
    _r.enableZoom = true;
    _r.enablePan = false;
    // _r.minAzimuthAngle = - Math.PI / 2; // V radians 90
    // _r.maxAzimuthAngle = Math.PI / 2; // V radians 90

    _r.tick = () => _r.update();

    return _r;
  }
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


///.
///. 캐릭터 이동을 나타낸다
///.

const movePlayer = (_p, _u) => {
  let _m = mMdl().players[mMdl().ids[0]];
  let _v = new Vector3(_p.x, _m.model.position.y, _p.z);

  let _c = _m.movements.length;
  let _d = _m.movements.length ? _m.movements[_c - 1] : _m.model.position; ///. 초기 행동을 나타낸다

  if (_d.distanceTo(_v) < 0.500) { return; } ///. 넘 가까운 거리 위치 지정 방지를 나타낸다

  if (_c) {
    if (_m.movements[_c - 1].x.toFixed(3) === _v.x.toFixed(3) && _m.movements[_c - 1].z.toFixed(3) === _v.z.toFixed(3)) {
      return;
    }
  } else {
    _m.activeDone = true; ///. 다음 애니를 위해 현재 애니가 끝났음을 나타낸다
    _m.deltaMove = undefined; ///. 이동 방향을 먼저 나타낸다
  }

  pickPos.copy(_p); ///. 이동지점을 나타낸다
 
  if (_d.distanceTo(_v) > stick.walking) {
    _m.state = 'Running';
  } else {
    _m.state = 'Walking'
  }

  _m.ctrl = _u; ///. 캐릭터 콘트롤 픽 그라운드, 화면 조이스틱, 키보드 등을 나타낸다
  _m.movements.push(_v);
}

///.
///. 그라운드 선택 이동을 나타낸다
///.

mRrr().renderer.domElement.addEventListener('click', onMouseClick, false);

function onMouseClick(e) {
  e = e || window.event;
  e.preventDefault();

  const _p = {
    x: (e.clientX / mRrr().renderer.domElement.clientWidth) * 2 - 1,
    y: -(e.clientY / mRrr().renderer.domElement.clientHeight) * 2 + 1,
  }

  raycaster.setFromCamera(_p, mCmr().camera);

  const intersects = raycaster.intersectObjects(mScn().scene.children, true);

  if (intersects[0]) {
    for (let i = 0; i < intersects.length; i++) {
      // console.log(intersects[i].object.name);
      if (intersects[i].object.name === 'groundHelper') { ///. null 제외를 나타낸다

        let _f = intersects[i].face;
        let _v = intersects[i].point; ///. Vector3
        let _o = intersects[i].object;

        let normalMatrix = new Matrix3().getNormalMatrix(_o.matrixWorld);
        let normal = _f.normal.clone().applyMatrix3(normalMatrix).normalize();
        mMkp().arrowHelper.position.copy(_v);
        mMkp().arrowHelper.setDirection(normal);

        movePlayer(_v, 'pick');
      }
    }
  }
}

///.
///. 조이스틱을 이용한 이동을 나타낸다
///.

function onJoystickMove(e) {
  if (stick.ready === false && stick.btn) {
    onJoystickStop();
    return;
  }

  if (stick.ready === true && !stick.btn) {
    stick.btn = true;
    let _m = mMdl().players[mMdl().ids[0]];
    _m.movements = [];
  }

  if (!stick.btn) { return; }

  e = e || window.event;
  e.preventDefault();

  let _d = stick.dot;
  let _c = stick.center;
  let _h = document.documentElement.clientHeight;
  let _o = stick.off;
  let _x = e.clientX || e.touches[0].clientX;
  let _y = e.clientY || e.touches[0].clientY;

  let _p = [
    _x - _c[0] - _o[0] / 2 + _o[0] / 8,
    (_h - _y) - _c[1] - _o[1] / 2 + _o[0] / 8
  ];

  _d.style.left = `${_p[0]}px`; ///. 조이스틱 애니메이션을 나타낸다
  _d.style.bottom = `${_p[1]}px`;

  // let _m = mMdl().players[mMdl().ids[0]];
  // if (_m.movements.length) { return; } ///. 조이스틱 이동은 한 개씩 나타낸다

  stick.xy = new Vector2((_p[0] + 32) - _o[0] / 4, _o[1] / 4 - (_p[1] + 32));
  stick.v.copy(stick.xy);
  stick.v.normalize(); ///. 단위 백터를 나타낸다

  let _t = new Vector2(0, 0).distanceTo(stick.xy);
  if (_t > _o[0]) { 
    stick.ready = false;
    onJoystickStop(); 
  }

  onJoystick();
}

const onJoystick = () => {
  let _m = mMdl().players[mMdl().ids[0]];
  let _c = _m.movements.length;

  if (_c > 1) { _m.movements.splice(1, _c - 1); } ///. 해동 변경에 따른 행동 배열에서 현재 지점만 남기고 삭제를 나타낸다

  let _o = stick.off;
  let _t = new Vector2(0, 0).distanceTo(stick.xy);
  let _vx = 0;
  let _vz = 0;

  if (_t < _o[0] * 0.0625) { return }; ///. 조이스틱 최소(조이스특 크기의 1/8) 이동을 나타낸다

  if (_t < _o[0] * 0.125) { ///. 조이스특 크기의 1/4 이동을 나타낸다
    _vx = stick.v.x * stick.walking; ///. 걷기 이동 거리를 나타낸다
    _vz = stick.v.y * stick.walking;
  } else {
    _vx = stick.v.x * stick.runing; ///. 뛰기 이동 거리를 나타낸다
    _vz = stick.v.y * stick.runing;
  }
  let _v = new Vector3(_vx + _m.model.position.x, 0, _vz + _m.model.position.z);

  movePlayer(_v, 'stick');
  for (let i = 0; i < 15; i++) { ///. 조이스틱이 정지해 있을 때를 생각해 같은 방향에 여러개의 위치값을 미리 나타낸다 
    _v.x = _v.x + _vx;
    _v.z = _v.z + _vz;
    _m.movements.push(_v); ///. 15개의 예상 지점을 나타낸나
  }

  mMkp().arrowHelper.position.copy(_v);
  mMkp().arrowHelper.setDirection(_v);
}

const onJoystickStop = () => {
  stick.btn = false;

  let _d = stick.dot;
  let _o = stick.off;

  _d.style.left = `${_o[0] / 8}px`;
  _d.style.bottom = `${_o[1] / 8}px`;

  let _m = mMdl().players[mMdl().ids[0]];

  let _c = _m.movements.length;
  if (_c > 1) { _m.movements.splice(1, _c - 1); } ///. 진행 중인 1개만 남긴을 나타낸다
}

const addEleJoystick = () => {
  let _d = document.getElementById('scene-container');

  let joystick = document.createElement('div');
  joystick.setAttribute('id', 'joystick');
  joystick.style.width = `${256 * stick.size}px`;
  joystick.style.height = `${256 * stick.size}px`;
  joystick.style.left = `${72 * stick.size}px`;;
  joystick.style.bottom = `${96 * stick.size}px`;

  let noSelect = document.createElement('class');
  noSelect.setAttribute('id', 'noSelect-joystick');
  joystick.appendChild(noSelect);

  let wrapper = document.createElement('div');
  wrapper.setAttribute('id', 'wrapper-joystick');
  wrapper.style.bottom = `${64 * stick.size}px`;
  wrapper.style.left = `${64 * stick.size}px`;
  wrapper.style.width = `${128 * stick.size}px`;
  wrapper.style.height = `${128 * stick.size}px`;
  noSelect.appendChild(wrapper);

  let btnJoystick = document.createElement('div');
  btnJoystick.setAttribute('id', 'button-joystick');
  btnJoystick.style.bottom = `${32 * stick.size}px`;
  btnJoystick.style.right = `${32 * stick.size}px`;
  btnJoystick.style.width = `${64 * stick.size}px`;
  btnJoystick.style.height = `${64 * stick.size}px`;
  wrapper.appendChild(btnJoystick);

  _d.appendChild(joystick);

  stick['rect'] = document.getElementById('joystick');
  stick['center'] = [parseInt(stick.rect.style.left, 10), parseInt(stick.rect.style.bottom, 10)];
  stick['off'] = [parseInt(stick.rect.style.width, 10), parseInt(stick.rect.style.height, 10)];
  stick['dot'] = document.getElementById('button-joystick');
  stick['xy'] = new Vector2(0, 0);
  stick['v'] = stick.xy.normalize();
  stick['btn'] = false;
  stick['ready'] = false;

  stick.rect.addEventListener('mousedown', () => { stick.ready = true }, false);
  stick.rect.addEventListener('mouseup', () => {
    stick.ready = false;
    onJoystickStop();
  }, false);
  stick.rect.addEventListener('mousemove', onJoystickMove, false);

  stick.rect.addEventListener('touchstart', () => { stick.ready = true }, false);
  stick.rect.addEventListener('touchend', () => {
    stick.ready = false;
    onJoystickStop();
  }, false);
  stick.rect.addEventListener('touchmove', onJoystickMove, false);
}

addEleJoystick();

export { mCtrl };
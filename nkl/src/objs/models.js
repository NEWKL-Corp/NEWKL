
import { AnimationMixer, AnimationClip, LoopOnce, Matrix4, Quaternion, Euler, Vector3 } from 'three';
import { GLTFLoader } from 'GLTFLoader';
import { DRACOLoader } from 'DRACOLoader';


const players = {};
const speed = {
  'Idle': 0,
  'Walking': 0.05,
  'Running': 0.1
};

const targetQuaternion = new Quaternion();

const mMdl = function (_t, _v) {
  return new mMdl.fn.init(_t, _v);
};

mMdl.fn = mMdl.prototype = {
  constructor: mMdl,

  ver: '22-0929-1541',
  length: 0,

  players: players,

  loadModel: async (_f, _p, _s, _n, _t) => { // file, pos, scale, num sene or children, name object
    let _r;

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();

    dracoLoader.setDecoderPath('../ven/three/example/js/libs/draco/gltf/');
    loader.setDRACOLoader(dracoLoader);

    let _d = await loader.loadAsync(_f);

    _r = set(_d, _p, _s, _n, _t);

    if (_r.userData.name !== undefined) {
      console.log('///.' + _r.userData.name);
      let _pls = players[_r.userData.name] = {
        model: _r,
        mixer: undefined,
        active: true,
        state: 'Idle',
        clips: {},
        movements: [],
        deltaMove: new Vector3,
        speed: 0,
        activeAction: undefined,
        activeDone: false,
        previousAction: undefined,
        face: ''
      };

      _pls.mixer = new AnimationMixer(_r); ///. 모델에 애니메이션 버퍼를 나타낸다
      _pls.mixer.removeEventListener('finished', () => { _pls.activeDone = true; });

      _pls.clips = _d.animations;

      let clip = AnimationClip.findByName(_pls.clips, _pls.state);
      _pls.speed = speed[_pls.state]; /// 'Standing', 'Walking', 'Running' 0, 0.02, 0.1

      _pls.state = clip.name;
      _pls.activeAction = _pls.mixer.clipAction(clip);
      _pls.activeDone = false;
      _pls.activeAction.play();

      // for (let i = 0; i < _d.animations.length; i++) {
      //   const clip = _d.animations[i];
      //   const action = players[_r.userData.name].mixer.clipAction(clip); ///. 모델 애니메이션 버퍼에 추가를 나타낸다
      //   players[_r.userData.name].clips[clip.name] = action;

      //   // if (emotes.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >= 4) {
      //   //   action.clampWhenFinished = true;
      //   //   action.loop = LoopOnce;
      //   // }
      // }

      // players[_r.userData.name].activeAction = players[_r.userData.name].clips['Running'];
      // players[_r.userData.name].activeAction.play();

      // // const states = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing'];
      // // const emotes = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp'];
    }

    return _r;
  },

  setModel: () => {
    let _r;

    return _r;
  },

  moveModel: (_m) => {
    let _r;
    move(_m);

    return _r;
  }
}

const init = mMdl.fn.init = function (_t, _v) {
  if (!_t) { return this; }

  let _r;
  if (typeof _t === "string") { ///. 문자열을 나타낸다

  } else { ///. 배열을 나타낸다

  }

  return _r;
}

init.prototype = mMdl.fn;

function set(_d, _p, _s, _n, _t) {
  let _r, _m, _c; /// result, model(scene), count of model
  _m = _d.scene;
  _c = _m.children.length - 1;

  if (_n.length) {
    _n = _n > _c ? _c : _n;
    _r = _m.children[_n]; ///. one model

  } else {
    _r = _m; ///. total model
  }

  _r.castShadow = true;
  return _r;
}

function move(_m) {
  if (!_m.movements.length) { return; }

  if (_m.deltaMove === undefined) { ///. 다음 위치 방향 회전을 나타낸다
    _m.state = 'Running';
    activeAction(_m.state);

    _m.deltaMove = _m.movements[0];

    let rotationMatrix = new Matrix4();
    rotationMatrix.lookAt(_m.deltaMove, _m.model.position, _m.model.up);
    targetQuaternion.setFromRotationMatrix(rotationMatrix);
  }

  if (!_m.model.quaternion.equals(targetQuaternion)) { ///. 이동 방향으로 회전을 나타낸다
    _m.model.quaternion.rotateTowards(targetQuaternion, _m.speed * 0.5);

  } else { ///. 이동 거리을 나타낸다
    let dPos = _m.model.position; ///. 출발지를 나타낸다
    let aPos = _m.movements[0]; /// _m.deltaMove ///. 도착지를 나타낸다

    let deltaMove = { /// 위치 또는 방향을 찾기 위한 삼각함수를 나타낸다 
      x: aPos.x - dPos.x,
      z: aPos.z - dPos.z
    };

    let diffX = Math.abs(deltaMove.x);
    let diffZ = Math.abs(deltaMove.z);
    let distance = Math.sqrt(diffX * diffX + diffZ * diffZ);

    let multiplierX = aPos.x > dPos.x ? 1 : -1;
    let multiplierZ = aPos.z > dPos.z ? 1 : -1;

    _m.model.position.x = _m.model.position.x + (_m.speed * (diffX / distance)) * multiplierX;
    _m.model.position.z = _m.model.position.z + (_m.speed * (diffZ / distance)) * multiplierZ;

    if ((_m.model.position).distanceTo(aPos) < 2 && _m.state !== 'Walking' && _m.movements.length === 1) {
      _m.state = 'Walking';
      activeAction(_m.state);
    }

    if ((_m.model.position).distanceTo(aPos) < 0.15) {
      _m.model.position.x = aPos.x;
      _m.model.position.z = aPos.z;

      _m.movements.shift(); ///. 도착한 위치 삭제을 나타낸다
      _m.deltaMove = undefined; ///. 다음 위치 방향 회전을 초기화를 나타낸다

      _m.state = 'Idle';
      activeAction(_m.state);
    } else {
      _m.activeDone = false;
    }
  }

  function activeAction(_t) {
    if (_m.activeDone) { return; }; ///. 하나의 동작이 끝나야 다음 동작을 나타낸다
    _m.activeDone = false;

    _m.activeAction.stop();

    let clip = AnimationClip.findByName(_m.clips, _t);
    _m.speed = speed[_t]; /// 'Idle', 'Walking', 'Running' 0, 0.02, 0.1

    _m.state = clip.name;

    _m.activeAction = _m.mixer.clipAction(clip);
    _m.activeAction.play();
  }
}

export { mMdl };
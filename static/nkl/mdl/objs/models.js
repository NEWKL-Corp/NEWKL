
import { AnimationMixer, AnimationClip, LoopOnce, LoopRepeat, Matrix4, Quaternion, Vector3 } from 'three';
import { GLTFLoader } from 'GLTFLoader';
import { DRACOLoader } from 'DRACOLoader';

const ids = []; ///. 캐릭터 아이디(0번째는 자신)를 나타낸다
const players = {};
const speed = {
  Idle: 0.00,
  Walking: 0.035,
  Running: 0.105,
  Rotating: { walk: 0.500, run: 1.000 }
};

const targetQuaternion = new Quaternion();

const npcs = {}; ///. 이벤트가 있는 오젝트들를 나타낸다
const stuffs = {}; ///. 이벤튼 없는 오젝트들을 나타낸다

const mMdl = function (_t, _v) {
  return new mMdl.fn.init(_t, _v);
};

mMdl.fn = mMdl.prototype = {
  constructor: mMdl,

  ver: '22-0929-1541',
  length: 0,

  ids: ids,
  players: players,
  stuffs: stuffs,
  npcs: npcs,

  load: async (_f, _p, _s, _n, _t, _o, _x) => { // file, pos, scale, num sene [] or children [0], type object, name object, name path
    let _r;

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();

    dracoLoader.setDecoderPath('/nkl/ven/three/example/js/libs/draco/gltf/');
    loader.setDRACOLoader(dracoLoader);

    let _d = await loader.loadAsync(_f);

    _r = set(_d, _p, _s, _n); ///. 초기 위치, 크기, 그림자 등을 나타낸다 

    if (_t === 'stuffs') { ///. 단순 오브젝트를 나타낸다
      stuffs[_o] = {
        model: _r,
        path: _x
      }

      _r.userData.name = undefined
    }

    if (_t === 'npcs') { ///. 이벤트 오브젝트를 나타낸다
      npcs[_o] = {
        model: _r,
        path: _x,
        active: true
      }

      _r.userData.name = undefined
    }

    if (_r.userData.name !== undefined) {
      console.log('///. ' + _r.userData.name); ///. glb 전체(_n [])를 로딩하면 undefined로 나타낸다

      ids.push(_o); ///. 첫 번째는 자신을 나타낸다
      let _m = players[_o] = {
        model: _r,
        mixer: undefined,
        active: true,
        state: 'Idle', ///. 현재 클립들을 나타낸다
        clips: {}, ///. 행동 클립들을 나타낸다
        movements: [], ///. 이동 위치들을 나타낸다
        deltaMove: new Vector3(),
        speed: 0,
        activeAction: undefined, ///. 진행 주인 행동을 나타낸다
        activeDone: false, ///. 행동 끝남을 나타낸다
        activeSet: undefined, ///. 해야할 행동을 나타낸다
        face: '',
        ctrl: '', ///. 캐릭터 콘트롤 픽 그라운드, 화면 조이스틱, 키보드 등을 나타낸다
        path: _x
      };

      _m.mixer = new AnimationMixer(_r); ///. 모델에 애니메이션 버퍼를 나타낸다
      _m.mixer.addEventListener('finished', (e) => { _m.activeDone = true; });

      _m.clips = _d.animations;

      let _c = AnimationClip.findByName(_m.clips, _m.state);
      _m.speed = speed[_m.state]; /// 'Standing', 'Walking', 'Running' 0, 0.02, 0.1

      _m.state = _c.name;
      _m.activeAction = _m.mixer.clipAction(_c);
      _m.activeDone = false;
      _m.activeAction.play();

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

function set(_d, _p, _s, _n) {
  let _r, _m, _c; /// result, model(scene), count of model
  _m = _d.scene;
  _c = _m.children.length - 1;

  if (_n.length) { ///. 특정 오브젝트를 나타낸다
    _n = _n > _c ? _c : _n;
    _r = _m.children[_n]; ///. one model

  } else { ///. 전체 오브젝트를 나타낸다
    _r = _m; ///. total model
  }

  if (_p.length) { ///. 위치를 나타낸다
    _r.position.set(_p[0], _p[1], _p[2]);
  }

  if (_s.length) { ///. 크기를 나타낸다
    _r.scale.set(_s[0], _s[1], _s[2]);
  }

  _r.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = false;
    }
  });

  return _r;
}

function move(_m) {
  let _c = _m.movements.length;
  if (!_c) { return; }

  if (_m.deltaMove === undefined) { ///. 다음 위치 방향 회전을 나타낸다
    activeAction(_m.state);

    _m.deltaMove = _m.movements[0];

    let rotationMatrix = new Matrix4();
    rotationMatrix.lookAt(_m.deltaMove, _m.model.position, _m.model.up);
    targetQuaternion.setFromRotationMatrix(rotationMatrix);
  }

  if (_m.model.quaternion.y.toFixed(3) !== targetQuaternion.y.toFixed(3) || _m.model.quaternion.w.toFixed(3) !== targetQuaternion.w.toFixed(3)) { ///. 이동 방향으로 회전을 나타낸다
    let _s = _m.state === 'Walking' ? speed.Rotating.walk : speed.Rotating.run;
    _m.model.quaternion.rotateTowards(targetQuaternion, _m.speed * _s);

  } else { ///. 이동 거리을 나타낸다
    let dPos = _m.model.position; ///. 현재 캐릭터 위치를 나타낸다
    let aPos = _m.movements[0]; ///. 도착지를 나타낸다

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

    ///. 지정 위치에 따른 이동을 나타낸다
    if (_m.ctrl === 'pick' || _m.ctrl === 'stick') {
      if ((_m.model.position).distanceTo(aPos) < 0.800 && _m.state !== 'Walking' && _c === 1) {
        _m.activeDone = true;
        activeAction('Walking');
      }

      if ((_m.model.position).distanceTo(aPos) < 0.100) { ///. 정지를 나타낸다
        _m.model.position.x = aPos.x;
        _m.model.position.z = aPos.z;

        _m.movements.shift(); ///. 도착한 위치 삭제을 나타낸다
        _m.deltaMove = undefined; ///. 다음 위치 방향 회전을 초기화를 나타낸다

        if (!_m.movements.length) {
          _m.activeDone = true;
          activeAction('Idle');
        }
      }
    }
  }

  function activeAction(_t) {
    if (!_m.activeDone) { return; }; ///. 하나의 동작이 끝나야 다음 동작을 나타낸다
    _m.activeDone = false;

    let _c = AnimationClip.findByName(_m.clips, _t); ///. Clip를 나타낸다
    let _a = _m.activeAction; ///. Current Action 현재의 행동을 나타낸다
    let _n = _m.mixer.clipAction(_c); ///. Next Action 다음 행동을 나타낸다
    // _m.activeAction.stop();

    _n.reset();
    _n.setLoop(LoopOnce, 1);
    _n.clampWhenFinished = true;
    _n.crossFadeFrom(_a, 0.2, true); ///. 행동 모션트위닝을 나타낸다

    _m.speed = speed[_t]; /// 'Idle', 'Walking', 'Running' 0, 0.035, 0.105
    _m.state = _c.name; ///. = _t를 나타낸다 

    _m.activeAction = _m.mixer.clipAction(_c);
    if (_m.ctrl === 'pick') { _m.activeAction.setLoop(LoopRepeat); }
    if (_m.ctrl === 'stick' && _m.state !== 'Idle') { _m.activeAction.setLoop(LoopRepeat); }  ///. LoopRepeat LoopOnce
    _m.activeAction.play();
  }
}

export { mMdl };
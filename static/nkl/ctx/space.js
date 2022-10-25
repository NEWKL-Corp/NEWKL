import { mCmr } from '../mdl/objs/cameras.js';
import { mLit } from '../mdl/objs/lights.js';
import { mScn } from '../mdl/objs/scene.js';

import { mStg } from '../mdl/story/stage.js';
import { mSpr } from '../mdl/objs/sprites.js';
import { mMdl } from '../mdl/objs/models.js';
import { mMda } from '../mdl/objs/medias.js';
import { mMkp } from '../mdl/objs/mockups.js';

import { mCtrl } from '../mdl/views/controls.js';
import { mRrr } from '../mdl/views/renderer.js';
import { mResizer } from '../mdl/views/resizer.js';
import { mLoop } from '../mdl/views/loop.js';

// let _c, _r, _s, _a, _l; ///. camera, renderer, scene, sound, loop
const _w = {}; ///. camera, renderer, scene, sound, loop

class mWorld {
  constructor(container) {
    _w._c = mCmr().camera;
    _w._r = mRrr().renderer;
    _w._s = mScn().scene;
    _w._a = mMda().addlistener;
    _w._l = new mLoop(_w._c, _w._s, _w._r); 

    container.append(_w._r.domElement);

    _w._o = mCtrl().orbit(_w._c, _w._r.domElement);
    const { ambientLight, mainLight, spotLight } = mLit().lights();

    _w._l.updatables.push(_w._o);
    // _s.add(ambientLight, mainLight, mainLight.target, spotLight);
    _w._s.add(ambientLight, mainLight);

    new mResizer(container, _w._c, _w._r);
    // const resizer = new mResizer(container, _w._c, _w._r);
  }

  async init() {
    // await mStg().xml('/nkl/ctx/space.xml'); ///. file

    _w._s.add(await mMkp().groundHelper([64, 32], 'world')); ///. size, divisions, object name
    _w._s.add(await mMkp().gridHelper([64, 32])); ///. size, divisions
    _w._s.add(await mMkp().axesHelper([5])); ///. size
    _w._s.add(await mMkp().arrowHelper); ///. ([[1, 2, 0], [0, 0, 0], 1, 0xffff00])); ///. size

    let { mainLight } = mLit().lights();
    _w._s.add(await mMkp().cameraHelper(mainLight.shadow.camera));

    _w._s.add(await mSpr().loadImg('/nkl/ctx/asset/ui-3btn-5.png', [5, 0, 5], [1, 1], [3, 5], 'btn')); ///. file, [x, y, z] position, [w, h] scale, [h, v] coordinate, name Material
    // _w._s.add(await mMdl().loadModel('/nkl/ctx/asset/world.glb', [0,0,0], [], [0])); ///. file, pos, scale, scene or children num, name Object
    // _w._s.add(await mMdl().loadModel('/nkl/ctx/asset/bread.glb', [0, 0, 0], [], [0]));

    ///. let _r = await mMdl().loadModel('/nkl/ctx/asset/robot.glb', [0, 0, 0], [], [0], 'robo');
    ///._w._s.add(_r);
    ///. mainLight.target = _r;
    _w._s.add(await mMdl().loadModel('/nkl/ctx/asset/robot.glb', [0, 0, 0], [], [0], 'robo')); ///. file, pos, scale, scene or children num, name Object
    
    // _s.add(await mMdl().loadModel('/nkl/ctx/asset/dongle_anim.glb', [0,0,0], [], []));

    // _w._c.add(_w._a); ///. 소리도 카메라에 따라 나타낸다
    // await mMda().loadSound('/nkl/ctx/asset/walking.mp3');

    console.log('%c///. LOADED NEWKL SPACE', 'color: #ff0000');
  }

  render() {
    _w._r.render(_w._s, _w._c);
  }

  start() {
    _w._l.start();
  }

  stop() {
    _w._l.stop();
  }
}

export { mWorld };
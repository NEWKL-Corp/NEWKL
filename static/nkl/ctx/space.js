import { mCmr } from '../mdl/objs/cameras.js';
import { mLit } from '../mdl/objs/lights.js';
import { mScn } from '../mdl/objs/scene.js';

import { mSpr } from '../mdl/objs/sprites.js';
import { mMdl } from '../mdl/objs/models.js';
import { mTxr } from '../mdl/objs/textures.js';
import { mMda } from '../mdl/objs/medias.js';
import { mMkp } from '../mdl/objs/mockups.js';

import { mCtrl } from '../mdl/views/controls.js';
import { mRrr } from '../mdl/views/renderer.js';
import { mResizer } from '../mdl/views/resizer.js';
import { mLoop } from '../mdl/views/loop.js';
import { mStg } from '../mdl/story/stage.js';

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

    _w._s.add(await mSpr().load('/nkl/ctx/asset/txr/ui-3btn-5.png', [5, 0, 5], [1, 1], [3, 5], 'btn')); ///. file, [x, y, z] position, [w, h] scale, [h, v] coordinate, name Material
    // _w._s.add(await mMdl().load('/nkl/ctx/asset/world.glb', [0,0,0], [], [0])); ///. file, pos, scale, scene or children num, name Object

    ///. file, pos, scale, scene [] or children [num], type obj, name obj, name path
    _w._s.add(await mMdl().load('/nkl/ctx/asset/obj/robot.glb', [0, 0, 0], [1, 1, 1], [0], 'players','robo', ''));
    _w._s.add(await mMdl().load('/nkl/ctx/asset/obj/flower.glb', [0, 0, 8], [9, 9, 9], [], 'stuffs', 'flower', ''));
    _w._s.add(await mMdl().load('/nkl/ctx/asset/obj/spring.glb', [15, 0, 15], [3, 3, 3], [], 'stuffs', 'spring', ''));
   
    _w._s.add(await mMdl().load('/nkl/ctx/asset/obj/robot.glb', [-10, 0, -10], [0.5, 0.5, 0.5], [0], 'npcs','robo-000', ''));
    _w._s.add(await mMdl().load('/nkl/ctx/asset/obj/world.glb', [10, 3, -10], [1, 1, 1], [], 'npcs', 'world', ''));
    
    _w._s.add(await mMdl().load('/nkl/ctx/asset/obj/car.glb', [0, 0.4, -8], [0.03, 0.03, 0.03], [2], 'npcs', 'car', 'plus')); ///. plus
    await mTxr().load('/nkl/ctx/asset/txr/car_01-03.png', 'car_01-03');
    mTxr().map('car', 'npcs', 'car_01-03'); ///. name obj, type obj, name texture

    _w._s.add(await mStg().path([], 'none')); ///. 이동 경로를 나타낸다

    // _w._c.add(_w._a); ///. 소리도 카메라에 따라 나타낸다
    // await mMda().load('/nkl/ctx/asset/walking.mp3');

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
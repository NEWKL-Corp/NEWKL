import { mCmr } from '../../src/objs/cameras.js';
import { mLit } from '../../src/objs/lights.js';
import { mScn } from '../../src/objs/scene.js';

import { mStg } from '../../src/story/stage.js';
import { mSpr } from '../../src/objs/sprites.js';
import { mMdl } from '../../src/objs/models.js';
import { mMkp } from '../../src/objs/mockups.js';

import { mCtrl } from '../../src/views/controls.js';
import { mRrr } from '../../src/views/renderer.js';
import { mResizer } from '../../src/views/resizer.js';
import { mLoop } from '../../src/views/loop.js';

let _c, _r, _s, _l; ///. camera, renderer, scene, loop

class mWorld {
  constructor(container) {
    _c = mCmr().camera;
    _r = mRrr().renderer;
    _s = mScn().scene;
    _l = new mLoop(_c, _s, _r);

    container.append(_r.domElement);

    let _o = mCtrl().orbit(_c, _r.domElement);
    const { ambientLight, mainLight, spotLight } = mLit().lights();

    _l.updatables.push(_o);
    _s.add(ambientLight, mainLight, spotLight);

    new mResizer(container, _c, _r);
    // const resizer = new mResizer(container, _c, _r);

  }

  async init() {
    // await mStg().xml('./newklworld/world.xml'); ///. file

    _s.add(await mMkp().groundHelper([64, 32], 'world')); ///. size, divisions, object name
    _s.add(await mMkp().gridHelper([64, 32])); ///. size, divisions
    _s.add(await mMkp().axesHelper([5])); ///. size
    _s.add(await mMkp().arrowHelper); ///. ([[1, 2, 0], [0, 0, 0], 1, 0xffff00])); ///. size

    const { mainLight} = mLit().lights();
    _s.add(await mMkp().cameraHelper(mainLight.shadow.camera));

    _s.add(await mSpr().imgLoad('./newklworld/asset/ui-3btn-5.png', [5, 0, 5], [1, 1], [3, 5], 'btn')); ///. file, [x, y, z] position, [w, h] scale, [h, v] coordinate, name Material
    // _s.add(await mMdl().loadModel('./newklworld/asset/world.glb', [0,0,0], [], [0])); ///. file, pos, scale, scene or children num, name Object
    // _s.add(await mMdl().loadModel('./newklworld/asset/bread.glb', [0, 0, 0], [], [0]));
    _s.add(await mMdl().loadModel('./newklworld/asset/robot.glb', [0, 0, 0], [], [0], 'robo')); ///. file, pos, scale, scene or children num, name Object
    // _s.add(await mMdl().loadModel('./newklworld/asset/dongle_anim.glb', [0,0,0], [], []));

    console.log('%c /// NewKL World', 'color: #ff0000');
  }

  render() {
    _r.render(_s, _c);
  }

  start() {
    _l.start();
  }

  stop() {
    _l.stop();
  }
}

export { mWorld };
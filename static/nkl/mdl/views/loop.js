import { Clock } from 'three';

import { mCmr } from '../objs/cameras.js';
import { mMdl } from '../objs/models.js';
import { mStg } from '../story/stage.js';

const clock = new Clock();
let time = Date.now();

class mLoop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();

      // render a frame
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    const delta = clock.getDelta();
    // console.log(`The last frame rendered in ${delta * 1000} milliseconds`);

    const players = mMdl().players;
    // let _p = ['RootNode'];
    for (let _p in players) {
      let _a = players[_p].mixer;
      if (_a !== undefined) _a.update(delta);

      if (players[_p].movements.length > 0) {
        mMdl().moveModel(players[_p]);
      }
    }

    const npcs = mMdl().npcs;
    for (let _n in npcs) {
      // console.log(npcs[_n].path);
      if (npcs[_n].path !== '' && npcs[_n].active) {
        const currentTime = Date.now();
        const deltaTime = currentTime - time;
        time = currentTime;

        mStg().moveNpc(npcs[_n].model, npcs[_n].path, time);
      }
    }

    if (mCmr().camera.position.y < 10) {
      mCmr().camera.position.y = 10;
    }

    for (const object of this.updatables) {
      object.tick(delta);
    }
  }
}

export { mLoop };
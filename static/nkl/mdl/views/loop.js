import { Clock } from 'three';

import { mCmr } from '../objs/cameras.js';
import { mMdl } from '../objs/models.js';

const clock = new Clock();

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
    // only call the getDelta function once per frame!
    const delta = clock.getDelta();

    const players = mMdl().players;
    let _k = ['RootNode'];
    for (let _k in players) {
      let _a = players[_k].mixer;
      if (_a !== undefined) _a.update(delta);

      if (players[_k].movements.length > 0) {
        mMdl().moveModel(players[_k]);
      }
    }

    // console.log(
    //   `The last frame rendered in ${delta * 1000} milliseconds`,
    // );


    if (mCmr().camera.position.y < 10) {
      mCmr().camera.position.y = 10;
    }

    for (const object of this.updatables) {
      object.tick(delta);
    }
  }
}

export { mLoop };
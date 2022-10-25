import { AudioListener, Audio, AudioLoader } from 'three';

// const listener = new AudioListener();
// // camera.add( listener );

// const sound = new Audio(listener);
// const audioLoader = new AudioLoader();

const mMda = function (_t, _v) {
  return new mMda.fn.init(_t, _v);
};

mMda.fn = mMda.prototype = {
  constructor: mMda,

  ver: '22-0929-1541',
  length: 0,
  // addlistener: listener,

  loadSound: async (_f) => {

    let _b = await audioLoader.load(_f);

    sound.setBuffer(_b);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
  }
}

const init = mMda.fn.init = function (_t, _v) {
  if (!_t) { return this; }

  let _r;
  if (typeof _t === "string") { ///. 문자열을 나타낸다

  } else { ///. 배열을 나타낸다

  }

  return _r;
}

init.prototype = mMda.fn;

export { mMda };
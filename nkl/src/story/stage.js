import { FileLoader } from 'three';

const stage = {
  texture: {}, ///. element
  sprite: {},

  player: {}, 
  npc: {},
  mob: {},
  
  ground: {},
  fixed: {},
  movable: {},

  ui: {},

  animation: {}, ///. event
  sequence: {},
  situation: {},
  event: {}
}

const mStg = function (_t, _v) {
  return new mStg.fn.init(_t, _v);
};

mStg.fn = mStg.prototype = {
  constructor: mStg,

  ver: '22-0929-1541',
  length: 0,
  stage: stage,

  xml: async (_f) => {
    const loader = new FileLoader();
    let _t = await loader.loadAsync(_f);
    xmlPaser(_t);
  }
}

const init = mStg.fn.init = function (_t, _v) {
  if (!_t) { return this; }

  let _r;
  if (typeof selector === "string") { ///. 문자열을 나타낸다

  } else { ///. 배열을 나타낸다

  }

  return _r;
}

init.prototype = mStg.fn;

function xmlPaser(_t){
  // console.log(_t)
}

export { mStg };
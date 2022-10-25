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
    return xmlPaser(_t);
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

function xmlPaser(_t) {
  let _r = {};

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(_t, "text/xml");

  let xmlStory = xmlDoc.querySelectorAll('story');
  _r[xmlStory[0].tagName] = JSON.parse(xmlStory[0].childNodes[0].nodeValue); ///. tagName은 'story'를 나타낸다
  console.log('story: ', _r.story);

  let _c = 0; ///. sequence 카운트를 나타낸다
  let xmlSequence = xmlDoc.querySelectorAll('sequence');
  _r[xmlSequence[0].tagName] = [];
  xmlSequence.forEach(value => {
    let _t = xmlSequence[0].tagName;
    _r[_t].push(JSON.parse(xmlSequence[0].childNodes[0].nodeValue)); ///. tagName은 'sequence'를 나타낸다
    let _c = _r[_t].length - 1;
    _r[_t][_c].ctx = [];
    _r[_t][_c].scene = [];
  })
  console.log('sequence: ', _r.sequence);

  xmlSequence.forEach(value => {
    value.childNodes.forEach(value2 => {
      if (value2.nodeType === 1) {
        // console.log(value2.tagName);
        _r.sequence[_c][value2.tagName].push(JSON.parse(value2.childNodes[0].nodeValue));

        // value2.childNodes.forEach(value3 => {
        //   if (value3.nodeType === 1) {
        //     // console.log(value3.childNodes[0].nodeValue);
        //     // arr.push(value2.textContent);

        //     value3.childNodes.forEach(value4 => {
        //       if (value4.nodeType === 1) {
        //         // console.log(value4.childNodes[0].nodeValue);
        //       }
        //     })
        //   }
        // })
      }
    })
  })

  _r.situation = [];

  return _r;
}

export { mStg };
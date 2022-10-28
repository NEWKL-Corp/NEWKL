import { FileLoader, SplineCurve, Vector3, Vector2, BufferGeometry, LineBasicMaterial, Line } from 'three';

const stages = {
  texture: {},
  sprite: {},

  players: {},
  npcs: {},
  stuffs: {},

  ui: {},

  sequence: {},
  situation: {},
  event: {},

  paths: {},
  animation: {}
}

const mStg = function (_t, _v) {
  return new mStg.fn.init(_t, _v);
};

mStg.fn = mStg.prototype = {
  constructor: mStg,

  ver: '22-0929-1541',
  length: 0,
  stages: stages,

  xml: async (_f) => {
    const loader = new FileLoader();
    let _t = await loader.loadAsync(_f);
    return xmlPaser(_t);
  },

  path: (_a, _n) => { ///. array path, name path
    let _path;
    if (_a.length) {
      let _p = []
      for (let i = 0; i < _a.length - 1; _i++) {
        _p.push(new Vector(_a[i][0], _a[i][1]));
      }
      _path = stages.paths[_n] = new SplineCurve(_p);
    } else {
      _path = stages.paths.plus;
    }

    const _d = _path.getPoints(100);
    const _g = new BufferGeometry().setFromPoints(_d);
    const _m = new LineBasicMaterial({ color: 0xffff00 });
    const _r = new Line(_g, _m);
    _r.rotation.x = Math.PI * .5;

    return _r;
  },

  moveNpc: (_m, _p, _d) => {
    _d = _d * 0.0001;
    let _cp = new Vector3();
    const _np = new Vector2();

    stages.paths[_p].getPointAt(_d % 1, _cp);
    stages.paths[_p].getPointAt((_d - 0.01) % 1, _np);

    _m.position.set(_cp.x, 0.4, _cp.y);
    _m.lookAt(_np.x, -40, _np.y); ///. -40 보는 방향 회전을 나타낸다
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
  // console.log('story: ', _r.story);

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
  // console.log('sequence: ', _r.sequence);

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

stages.paths.plus = new SplineCurve([
  new Vector2(10, 5),
  new Vector2(5, 5),
  new Vector2(5, 10),
  new Vector2(-5, 10),
  new Vector2(-5, 5),
  new Vector2(-10, 5),
  new Vector2(-10, -5),
  new Vector2(-5, -5),
  new Vector2(-5, -10),
  new Vector2(5, -10),
  new Vector2(5, -5),
  new Vector2(10, -5),
  new Vector2(10, 5),
]);

export { mStg };
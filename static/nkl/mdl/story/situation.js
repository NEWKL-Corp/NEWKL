const situation = {};
const events = {
  loc:{}, ///. 위치 값에 따른 이벤트를 나타낸다
  obj:{} ///. NPC 또는 물체를 선택에 따른 이벤트를 나타낸다
};

const mSta = function (_t, _v) {
  return new mSta.fn.init(_t, _v);
};

mSta.fn = mSta.prototype = {
  constructor: mSta,

  ver: '22-0929-1541',
  length: 0,
}

const init = mSta.fn.init = function (_t, _v) {
  if (!_t) { return this; }

  let _r;
  if (typeof selector === "string") { ///. 문자열을 나타낸다

  } else { ///. 배열을 나타낸다

  }

  return _r;
}

init.prototype = mSta.fn;

export { mSta };
const sequence = {};

const mSeq = function (_t, _v) {
  return new mSeq.fn.init(_t, _v);
};

mSeq.fn = mSeq.prototype = {
  constructor: mSeq,

  ver: '22-0929-1541',
  length: 0,
}

const init = mSeq.fn.init = function (_t, _v) {
  if (!_t) { return this; }

  let _r;
  if (typeof selector === "string") { ///. 문자열을 나타낸다

  } else { ///. 배열을 나타낸다

  }

  return _r;
}

init.prototype = mSeq.fn;

export { mSeq };
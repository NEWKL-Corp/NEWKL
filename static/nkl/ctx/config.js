const addEleBtnPlay = () => {
  let overlay = document.createElement("div");
  overlay.setAttribute('id', 'overlay');

  let btnPlay = document.createElement('input');
  btnPlay.setAttribute('id', 'btnPlay');
  btnPlay.type = 'button';
  btnPlay.value = 'NEWKL SPACE PLAY';
  overlay.appendChild(btnPlay);

  document.body.appendChild(overlay);
}

async function trigger() {
  ///. DATA BINDING
  const { mStg } = await import('../mdl/story/stage.js');
  let _j = await mStg().xml('/nkl/ctx/space.xml'); ///. xml을 파싱하고 json으로 나타낸다

  ///. LOADING
  const { mWorld } = await import('./space.js');
  const container = document.querySelector('#scene-container');
  const world = new mWorld(container); ///. 3D 환경 생성을 나타낸다
  await world.init(_j); ///. json에 따른 진행과 오브젝트들을 나타낸다

  world.start();
}

addEleBtnPlay();
function play() {
  const overlay = document.getElementById('overlay');
  overlay.remove();
  console.log('///. PLAY NEWKL SPACE');
}

const _b = document.getElementById('btnPlay');
_b.addEventListener('click', play);

trigger().catch((err) => {
  console.log(err);
})

const addEleBtnPlay = () => {
  let overlay = document.createElement('div')
  overlay.setAttribute('id', 'overlay')

  let btnPlay = document.createElement('input')
  btnPlay.setAttribute('id', 'btnPlay')
  btnPlay.type = 'button'
  btnPlay.value = 'NEWKL SPACE PLAY'
  overlay.appendChild(btnPlay)

  document.body.appendChild(overlay)
}

const addEleJoystick = () => {
  let _d = document.getElementById('scene-container')

  let joystick = document.createElement('div')
  joystick.setAttribute('id', 'joystick')
  joystick.style.width = 256 + 'px'
  joystick.style.height = 256 + 'px'
  joystick.style.left = 0 + 'px'
  joystick.style.bottom = 80 + 'px'

  let noSelect = document.createElement('class')
  noSelect.setAttribute('id', 'noSelect-joystick')
  joystick.appendChild(noSelect)

  let wrapper = document.createElement('div')
  wrapper.setAttribute('id', 'wrapper-joystick')
  noSelect.appendChild(wrapper)

  let btnJoystick = document.createElement('div')
  btnJoystick.setAttribute('id', 'button-joystick')
  wrapper.appendChild(btnJoystick)

  _d.appendChild(joystick)
}

async function trigger() {
  addEleJoystick()

  ///. DATA BINDING
  const { mStg } = await import('/src/story/stage.js')
  await mStg().xml('/world.xml') ///. file

  ///. LOADING
  const { mWorld } = await import('./world.js')
  const container = document.querySelector('#scene-container')
  const world = new mWorld(container) /// 3D 환경 생성을 나타낸다
  await world.init() /// 모델들을 나타낸다

  world.start()
}

addEleBtnPlay()
function play() {
  const overlay = document.getElementById('overlay')
  overlay.remove()
  console.log('///. PLAY NEWKL SPACE')
}

const _b = document.getElementById('btnPlay')
_b.addEventListener('click', play)

trigger().catch((err) => {
  console.log(err)
})

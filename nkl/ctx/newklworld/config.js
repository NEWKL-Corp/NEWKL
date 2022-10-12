function addElement() {
  let _d = document.getElementById("scene-container");
  
  let joystick = document.createElement("div");
  joystick.setAttribute("id", "joystick");
  joystick.style.width = 256 + 'px';
  joystick.style.height = 256 + 'px';
  joystick.style.left = 0 + 'px';
  joystick.style.bottom = 80 + 'px';

  let noSelect = document.createElement("class");
  noSelect.setAttribute("id", "noSelect-joystick");
  joystick.appendChild(noSelect);

  let wrapper = document.createElement("div");
  wrapper.setAttribute("id", "wrapper-joystick");
  noSelect.appendChild(wrapper);

  let button = document.createElement("div");
  button.setAttribute("id", "button-joystick");
  wrapper.appendChild(button);

  // let newContent = document.createTextNode("환영합니다!");
  // newDiv.appendChild(newContent);

  _d.appendChild(joystick);
}

async function trigger() {
  addElement();

  const { mStg } = await import('../../src/story/stage.js');
  await mStg().xml('./newklworld/world.xml'); ///. file
  
  const { mWorld } = await import('./world.js');
  const container = document.querySelector('#scene-container');
  const world = new mWorld(container); /// 3D 환경 생성을 나타낸다
  await world.init(); /// 모델들을 나타낸다

  world.start();
}

trigger().catch((err) => {
  console.log(err);
});
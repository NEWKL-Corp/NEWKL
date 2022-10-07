
import { mStg } from '../../src/story/stage.js';
import { mWorld } from './world.js';

function addElement() {
  let _d = document.getElementById("scene-container");
  
  let wrapper = document.createElement("div");
  wrapper.setAttribute("id", "wrapper-joystick");

  let button = document.createElement("div");
  button.setAttribute("id", "button-joystick");
  wrapper.appendChild(button);

  // let newContent = document.createTextNode("환영합니다!");
  // newDiv.appendChild(newContent);

  _d.appendChild(wrapper);
}

async function trigger() {
  await mStg().xml('./newklworld/world.xml'); ///. file
  
  const container = document.querySelector('#scene-container');
  const world = new mWorld(container); /// 3D 환경 생성을 나타낸다
  await world.init(); /// 모델들을 나타낸다

  addElement();

  world.start();
}

trigger().catch((err) => {
  console.log(err);
});
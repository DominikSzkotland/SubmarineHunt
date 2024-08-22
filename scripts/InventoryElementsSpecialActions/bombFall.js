import {shipInventory} from './../shipInventory.js';
import {removeBomb} from '../elementsTemplates.js';
const ocean = document.getElementById('ocean');
const fall = (elements, speed) => {
  elements.forEach((element) => {
    if (element.getAttribute('data-moving') === 'true') {
      return;
    }
    element.setAttribute('data-moving', 'true');
    requestAnimationFrame(() => {
      moving(element, speed);
    });
  });
};
const moving = (element, speed) => {
  element.style.top = `${parseFloat(element.style.top) + speed}%`;
  if (element.offsetTop + element.offsetHeight * 0.8 < ocean.offsetHeight) {
    requestAnimationFrame(() => moving(element, speed));
  } else {
    removeBomb(element);
    element.remove();
    const bombIndex = shipInventory.findIndex((item) => item.name === 'bomb');
    shipInventory[bombIndex].count++;
  }
};
export default fall;

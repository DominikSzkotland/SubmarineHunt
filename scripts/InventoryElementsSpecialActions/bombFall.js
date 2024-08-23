import {shipInventory} from './../shipInventory.js';
import {removeElement, flowingElements} from '../elementsTemplates.js';
import checkCollision from '../collisionChecking.js';
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
  for (let i = 0; i < flowingElements.length; i++) {
    if (checkCollision(element, flowingElements[i])) {
      removeElement(element);
      removeElement(flowingElements[i]);
      const bombIndex = shipInventory.findIndex((item) => item.name === 'bomb');
      shipInventory[bombIndex].count++;
      return;
    }
  }
  element.style.top = `${parseFloat(element.style.top) + speed}%`;
  if (element.offsetTop + element.offsetHeight * 0.8 < ocean.offsetHeight) {
    requestAnimationFrame(() => moving(element, speed));
  } else {
    removeElement(element);
    const bombIndex = shipInventory.findIndex((item) => item.name === 'bomb');
    shipInventory[bombIndex].count++;
  }
};
export default fall;

import {shipInventory} from './../shipInventory.js';
import {removeElement, flowingElements, getNewAnimationFrame, removeAnimationIDFromList} from '../elementsTemplates.js';
import checkCollision from '../collisionChecking.js';
const ocean = document.getElementById('ocean');
const fall = (elements, speed) => {
  elements.forEach((element) => {
    if (element.getAttribute('data-moving') === 'true') {
      return;
    }
    element.setAttribute('data-moving', 'true');
    startAnimation(element, () => moving(element, speed));
  });
};
const startAnimation = (element, animationFunction) => {
  const animationID = getNewAnimationFrame(animationFunction);
  element.setAttribute('data-animation-id', animationID);
};

const stopAnimation = (element) => {
  const animationID = element.getAttribute('data-animation-id');
  if (animationID) {
    cancelAnimationFrame(animationID);
    removeAnimationIDFromList(animationID);
    element.removeAttribute('data-animation-id');
    element.setAttribute('data-moving', 'false');
  }
};
const moving = (element, speed) => {
  stopAnimation(element);
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
    startAnimation(element, () => moving(element, speed));
  } else {
    removeElement(element);
    const bombIndex = shipInventory.findIndex((item) => item.name === 'bomb');
    shipInventory[bombIndex].count++;
  }
};
export default fall;

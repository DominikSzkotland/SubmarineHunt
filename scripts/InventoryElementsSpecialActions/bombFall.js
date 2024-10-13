import {shipInventory, updateAmmoInStatusBar} from './../shipInventory.js';
import {removeElement, flowingElements, getNewAnimationFrame, removeAnimationIDFromList, elementTemplates} from '../elementsTemplates.js';
import * as points from '../pointsControl.js';
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
      const elementType = element.getAttribute('data-elementType');
      const flowingElementType = flowingElements[i].getAttribute('data-elementType');
      if (elementType && elementTemplates[elementType]) {
        points.add(elementTemplates[elementType].pointValue);
      }
      if (flowingElementType && elementTemplates[flowingElementType]) {
        points.add(elementTemplates[flowingElementType].pointValue);
      }
      removeElement(element);
      removeElement(flowingElements[i]);
      const bombIndex = shipInventory.findIndex((item) => item.name === 'Bomb');
      shipInventory[bombIndex].count++;
      updateAmmoInStatusBar();
      return;
    }
  }
  element.style.top = `${parseFloat(element.style.top) + speed}%`;
  if (element.offsetTop + element.offsetHeight * 0.8 < ocean.offsetHeight) {
    startAnimation(element, () => moving(element, speed));
  } else {
    removeElement(element);
    const bombIndex = shipInventory.findIndex((item) => item.name === 'Bomb');
    shipInventory[bombIndex].count++;
    updateAmmoInStatusBar();
  }
};
export default fall;

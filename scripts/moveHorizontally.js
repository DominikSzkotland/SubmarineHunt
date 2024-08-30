import {removeElement, getNewAnimationFrame, removeAnimationIDFromList} from './elementsTemplates.js';
const ocean = document.getElementById('ocean');

const moveHorizontally = (elementToMove, moveSpeed) => {
  if (elementToMove.getAttribute('data-moving') === 'true') {
    return;
  }
  elementToMove.setAttribute('data-moving', 'true');

  switch (elementToMove.getAttribute('data-turn')) {
    case 'left':
      startAnimation(elementToMove, () => moveTowardsRightSide(elementToMove, moveSpeed));
      break;
    case 'right':
      startAnimation(elementToMove, () => moveTowardsLeftSide(elementToMove, moveSpeed));
      break;
  }
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

const moveTowardsRightSide = (elementToMove, moveSpeed) => {
  stopAnimation(elementToMove);
  elementToMove.style.right = `${parseFloat(elementToMove.style.right) - moveSpeed}%`;

  if (elementToMove.offsetLeft <= ocean.offsetWidth) {
    startAnimation(elementToMove, () => moveTowardsRightSide(elementToMove, moveSpeed));
  } else {
    removeElement(elementToMove);
  }
};

const moveTowardsLeftSide = (elementToMove, moveSpeed) => {
  stopAnimation(elementToMove);
  elementToMove.style.left = `${parseFloat(elementToMove.style.left) - moveSpeed}%`;

  if (elementToMove.offsetLeft + elementToMove.offsetWidth >= 0) {
    startAnimation(elementToMove, () => moveTowardsLeftSide(elementToMove, moveSpeed));
  } else {
    removeElement(elementToMove);
  }
};

export default moveHorizontally;

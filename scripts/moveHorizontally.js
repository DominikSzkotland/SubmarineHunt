import {removeElement} from './elementsTemplates.js';
const ocean = document.getElementById('ocean');
const moveHorizontally = (elementToMove, moveSpeed) => {
  if (elementToMove.getAttribute('data-moving') === 'true') {
    return;
  }
  elementToMove.setAttribute('data-moving', 'true');
  switch (elementToMove.getAttribute('data-turn')) {
    case 'left':
      requestAnimationFrame(() => moveTowardsRightSide(elementToMove, moveSpeed));
      break;
    case 'right':
      requestAnimationFrame(() => moveTowardsLeftSide(elementToMove, moveSpeed));
      break;
  }
};

const moveTowardsRightSide = (elementToMove, moveSpeed) => {
  elementToMove.style.right = `${parseFloat(elementToMove.style.right) - moveSpeed}%`;
  if (elementToMove.offsetLeft <= ocean.offsetWidth) {
    requestAnimationFrame(() => moveTowardsRightSide(elementToMove, moveSpeed));
  } else {
    removeElement(elementToMove);
  }
};

const moveTowardsLeftSide = (elementToMove, moveSpeed) => {
  elementToMove.style.left = `${parseFloat(elementToMove.style.left) - moveSpeed}%`;
  if (elementToMove.offsetLeft + elementToMove.offsetWidth >= 0) {
    requestAnimationFrame(() => moveTowardsLeftSide(elementToMove, moveSpeed));
  } else {
    removeElement(elementToMove);
  }
};

export default moveHorizontally;

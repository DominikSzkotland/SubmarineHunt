const adjustSize = (elementsToAdjust) => {
  if (Array.isArray(elementsToAdjust) === true) {
    elementsToAdjust.forEach((element) => {
      detectAndAdjustSize(element);
    });
  } else {
    detectAndAdjustSize(elementsToAdjust);
  }
  return elementsToAdjust;
};

const detectAndAdjustSize = (element) => {
  switch (element.getAttribute('data-elementType')) {
    case 'submarine':
      const submarine = element;
      if (submarine.getAttribute('data-turn') === 'right') {
        submarine.style.transform = 'scaleX(-1)';
      }
      submarine.style.width = Math.floor(1.8 * submarine.offsetHeight) + 'px';
      break;
    case 'bomb':
      const bomb = element;
      bomb.style.width = Math.floor(0.33 * bomb.offsetHeight) + 'px';
      break;
    case 'ship':
      const ship = element;
      ship.style.width = Math.floor(2.5 * ship.offsetHeight) + 'px';
      break;
    case 'resumeButton':
      const resumeButton = element;
      resumeButton.style.maxHeight = 'none';
      resumeButton.style.width = Math.floor(1 * resumeButton.offsetHeight) + 'px';
      resumeButton.style.maxHeight = Math.floor(1 * resumeButton.offsetWidth) + 'px';
      break;
    case 'restartButton':
      const restartButton = element;
      restartButton.style.maxHeight = 'none';
      restartButton.style.width = Math.floor(1 * restartButton.offsetHeight) + 'px';
      restartButton.style.maxHeight = Math.floor(1 * restartButton.offsetWidth) + 'px';
      break;
    case 'quitButton':
      const quitButton = element;
      quitButton.style.maxHeight = 'none';
      quitButton.style.width = Math.floor(1 * quitButton.offsetHeight) + 'px';
      quitButton.style.maxHeight = Math.floor(1 * quitButton.offsetWidth) + 'px';
      break;
    default:
      console.error('You are trying to adjust an undefined element!');
      break;
  }
};

export default adjustSize;

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
    default:
      console.error('You are trying to adjust an undefined element!');
      break;
  }
};

export default adjustSize;

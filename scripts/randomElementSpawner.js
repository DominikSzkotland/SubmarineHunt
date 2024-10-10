import spawnOffScreen from './spawnOffScreen.js';
import moveHorizontally from './moveHorizontally.js';
import {submarineTemplate} from './elementsTemplates.js';

const chooseElementToSpawn = () => {
  const randomNumber = Math.random();
  if (typeof randomNumber === 'number') {
    return 'submarine';
  } else {
    console.error('You are trying to spawn an undefined element!');
  }
};

const spawnRandomElement = () => {
  const selectedElement = chooseElementToSpawn();
  switch (selectedElement) {
    case 'submarine':
      moveHorizontally(spawnOffScreen(submarineTemplate), 0.3);
      break;
    default:
      console.error('You are trying to spawn an undefined element!');
      break;
  }
};

export {spawnRandomElement};

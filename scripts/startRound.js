import spawnOffScreen from './spawnOffScreen.js';
import {submarineTemplate} from './elementsTemplates.js';
import moveHorizontally from './moveHorizontally.js';
let intervalStartTime = null;
let intervalID = null;
const startRound = (timeToFirstRun = null) => {
  if (intervalID !== null) {
    return;
  }
  console.log(timeToFirstRun);
  if (timeToFirstRun !== null) {
    setTimeout(() => {
      run();
      intervalID = setInterval(() => {
        intervalStartTime = Date.now();
        run();
      }, 2000);
    }, timeToFirstRun);
  } else {
    intervalID = setInterval(() => {
      intervalStartTime = Date.now();
      run();
    }, 2000);
  }
};

const chooseElementToSpawn = () => {
  const randomNumber = Math.random();
  console.log(randomNumber);
  if (typeof randomNumber === 'number') {
    return 'submarine';
  } else {
    console.error('You are trying to spawn an undefined element!');
  }
};

const run = () => {
  const selectedElement = chooseElementToSpawn();
  console.log(selectedElement);
  switch (selectedElement) {
    case 'submarine':
      moveHorizontally(spawnOffScreen(submarineTemplate), 0.3);
      break;
    default:
      console.error('You are trying to spawn an undefined element!');
      break;
  }
};
export {startRound, intervalID, intervalStartTime};

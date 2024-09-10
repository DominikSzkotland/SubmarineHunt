import spawnOffScreen from './spawnOffScreen.js';
import {cancelAllAnimationFrames, spawnedBombs, submarineTemplate} from './elementsTemplates.js';
import moveHorizontally from './moveHorizontally.js';
import {flowingElements, droppedElements} from './elementsTemplates.js';
import fall from './InventoryElementsSpecialActions/bombFall.js';
let intervalStartTime = null;
let intervalElapsedTime = null;
let intervalID = null;
const startRound = (timeToFirstRun = null) => {
  if (intervalID !== null) {
    return;
  }
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
  if (typeof randomNumber === 'number') {
    return 'submarine';
  } else {
    console.error('You are trying to spawn an undefined element!');
  }
};

const run = () => {
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

const pauseRun = () => {
  cancelAllAnimationFrames();
  clearInterval(intervalID);
  intervalID = null;
  const intervalEndTime = Date.now();
  intervalElapsedTime = intervalEndTime - intervalStartTime;
  intervalStartTime = null;
};

const resumeFrozen = () => {
  flowingElements.forEach((element) => {
    moveHorizontally(element, 0.3);
  });
  fall(spawnedBombs, 0.7);
};
export {startRound, intervalID, intervalElapsedTime, pauseRun, resumeFrozen};

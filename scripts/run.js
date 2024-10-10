import {cancelAllAnimationFrames, flowingElements, spawnedBombs} from './elementsTemplates.js';
import fall from './InventoryElementsSpecialActions/bombFall.js';
import moveHorizontally from './moveHorizontally.js';

let timeoutID = null;
let startTime = 0;
let pauseTime = 0;
let missingTime = 0;
let primeDelay = null;
const start = (functionToExecute = () => {}, delayTime = 0) => {
  if (primeDelay === null) {
    primeDelay = delayTime;
  }
  startTime = Date.now();
  if (pauseTime !== 0) {
    timeoutID = setTimeout(() => executeProvidedCode(functionToExecute), delayTime - missingTime);
    pauseTime = 0;
  } else {
    timeoutID = setTimeout(() => executeProvidedCode(functionToExecute), delayTime);
  }
};

const resume = () => {
  flowingElements.forEach((element) => {
    moveHorizontally(element, 0.3);
  });
  fall(spawnedBombs, 0.7);
};

const pause = () => {
  if (timeoutID === null) return;
  pauseTime = Date.now();
  missingTime = pauseTime - startTime;
  clearTimeout(timeoutID);
  cancelAllAnimationFrames();
  timeoutID = null;
};

const end = () => {
  clearTimeout(timeoutID);
  timeoutID = null;
  startTime = 0;
  pauseTime = 0;
  missingTime = 0;
  primeDelay = null;
};

const executeProvidedCode = (providedFunction = () => {}) => {
  providedFunction();
  start(providedFunction, primeDelay);
};

export {end, pause, resume, start};

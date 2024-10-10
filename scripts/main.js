import autoSwitchTheme from './themeChanger.js';
import adjustSize from './sizeAdjuster.js';
import {updateClickState, disableAllKeys, enableAllKeys, resetGameKeys} from './keyboardClickHandling.js';
import isTouchDevice from './touchDeviceDetection.js';
import {flowingElements, removeAllElements, droppedElements} from './elementsTemplates.js';
import {resetHearts} from './heartsControl.js';
import {resetInventory} from './shipInventory.js';
import {swapButtonsFunctions, updateTouchState} from './screenTouchHandling.js';
import * as run from './run.js';
import * as timer from './timerControl.js';
import {spawnRandomElement} from './randomElementSpawner.js';

const startRound = () => {
  console.log('start round');
  isPaused = false;
  run.start(spawnRandomElement, 2000);
  timer.start();
  enableAllKeys();
  removeAllElements();
  resetHearts();
  enableAllKeys();
  hideOptions();
};
const endRound = () => {
  console.log('end round');
  HidePauseManu();
  run.end();
  timer.pause();
  timer.reset();
  resetGameKeys();
  disableAllKeys();
  resetHearts();
  resetInventory();
  showOptions();
};
const pauseRound = () => {
  console.log('pause round');
  run.pause();
  resetGameKeys();
  timer.pause();
  resetGameKeys();
  disableAllKeys();
};
const resumeRound = () => {
  console.log('resume round');
  isPaused = false;
  HidePauseManu();
  run.resume();
  run.start(spawnRandomElement, 2000);
  timer.start(timer.intervalElapsedTime);
  resetGameKeys();
  enableAllKeys();
};
const showOptions = () => {
  document.getElementById('optionsMask').classList.remove('hide');
  document.getElementById('optionsMask').classList.add('blurred');
};
const hideOptions = () => {
  document.getElementById('optionsMask').classList.remove('blurred');
  document.getElementById('optionsMask').classList.add('hide');
};
const ShowPauseManu = () => {
  document.getElementById('pauseButton').classList.add('hide');
  document.getElementById('pauseMask').classList.remove('hide');
  document.getElementById('pauseMask').classList.add('blurred');
  adjustSize(document.getElementById('pauseButton'));
  adjustSize(document.getElementById('resumeButton'));
  adjustSize(document.getElementById('restartButton'));
  adjustSize(document.getElementById('quitButton'));
};
const HidePauseManu = () => {
  document.getElementById('pauseMask').classList.remove('blurred');
  document.getElementById('pauseMask').classList.add('hide');
  document.getElementById('pauseButton').classList.remove('hide');
  adjustSize(document.getElementById('pauseButton'));
};
document.addEventListener(
  'dragstart',
  function (event) {
    event.preventDefault();
  },
  true
);
if (!isTouchDevice()) {
  const mobileSterringButtons = document.getElementsByClassName('mobileSterringButtons');
  const mobileSterringButtonsArray = Array.from(mobileSterringButtons);
  mobileSterringButtonsArray.forEach((element) => {
    element.remove();
  });
  window.addEventListener('keydown', (event) => {
    updateClickState(event.code, true);
  });
  window.addEventListener('keyup', (event) => {
    updateClickState(event.code, false);
  });
} else {
  for (const button of document.getElementsByClassName('mobileSterringButtons')) {
    button.addEventListener('touchstart', () => {
      updateTouchState(button.id, true);
    });
    button.addEventListener('touchend', () => {
      updateTouchState(button.id, false);
    });
  }
}
autoSwitchTheme();
const Play = () => {
  disableAllKeys();
  showOptions();
  document.getElementById('playBox').removeEventListener('click', Play);
  document.getElementById('welcomeMask').classList.add('hide');
  adjustSize(document.getElementById('ship'));
  adjustSize(document.getElementById('pauseButton'));
  adjustSize(document.getElementById('resumeButton'));
  adjustSize(document.getElementById('restartButton'));
  adjustSize(document.getElementById('quitButton'));
  document.getElementById('pauseMask').classList.add('hide');
};
document.getElementById('playBox').addEventListener('click', Play);
window.addEventListener('resize', () => {
  adjustSize(flowingElements);
  adjustSize(droppedElements);
  adjustSize(document.getElementById('ship'));
  adjustSize(document.getElementById('pauseButton'));
  adjustSize(document.getElementById('resumeButton'));
  adjustSize(document.getElementById('restartButton'));
  adjustSize(document.getElementById('quitButton'));
});
document.getElementById('startButton').addEventListener('click', () => {
  document.getElementById('optionsMask').classList.add('hide');
  startRound();
});
var isBlurred = false;
window.addEventListener('blur', () => {
  console.log('blur');
  isBlurred = true;
  pauseRound();
});

window.addEventListener('focus', () => {
  console.log('focus');
  isBlurred = false;
  if (!isBlurred && !isPaused && document.getElementById('optionsMask').classList.contains('hide')) {
    resumeRound();
  }
});
var isPaused = true;
document.getElementById('pauseButton').addEventListener('click', () => {
  isPaused = true;
  pauseRound();
  ShowPauseManu();
});
document.getElementById('resumeButton').addEventListener('click', () => {
  resumeRound();
});
document.getElementById('restartButton').addEventListener('click', () => {
  endRound();
  startRound();
});
document.getElementById('quitButton').addEventListener('click', () => {
  endRound();
});
export {isPaused, isBlurred, endRound};

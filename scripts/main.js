import autoSwitchTheme from './themeChanger.js';
import adjustSize from './sizeAdjuster.js';
import {updateClickState, disableAllKeys, enableAllKeys, resetGameKeys} from './keyboardClickHandling.js';
import isTouchDevice from './touchDeviceDetection.js';
import {flowingElements, removeAllElements, droppedElements} from './elementsTemplates.js';
import {startInterval, pauseRun, resumeFrozen} from './run.js';
import {resetHearts} from './heartsControl.js';
import {resetInventory} from './shipInventory.js';
const startRound = () => {
  removeAllElements();
  startInterval();
  resetHearts();
  enableAllKeys();
  hideOptions();
};
const endRound = () => {
  pauseRun();
  resetGameKeys();
  disableAllKeys();
  resetHearts();
  resetInventory();
  showOptions();
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
window.addEventListener('keydown', (event) => {
  updateClickState(event.code, true);
});
window.addEventListener('keyup', (event) => {
  updateClickState(event.code, false);
});

var isBlurred = false;
window.addEventListener('blur', () => {
  isBlurred = true;
  pauseRun();
  resetGameKeys();
});

window.addEventListener('focus', () => {
  isBlurred = false;
  if (!isBlurred && !isPaused && document.getElementById('optionsMask').classList.contains('hide')) {
    resumeFrozen();
    startInterval();
  }
});
var isPaused = false;
document.getElementById('pauseButton').addEventListener('click', () => {
  isPaused = true;
  pauseRun();
  resetGameKeys();
  ShowPauseManu();
});
document.getElementById('resumeButton').addEventListener('click', () => {
  isPaused = false;
  resumeFrozen();
  startInterval();
  HidePauseManu();
});
document.getElementById('restartButton').addEventListener('click', () => {
  isPaused = false;
  HidePauseManu();
  endRound();
  startRound();
});
document.getElementById('quitButton').addEventListener('click', () => {
  isPaused = false;
  HidePauseManu();
  endRound();
});
export {isPaused, isBlurred, endRound};

import autoSwitchTheme from './themeChanger.js';
import adjustSize from './sizeAdjuster.js';
import {updateClickState, disableAllKeys, enableAllKeys, resetGameKeys} from './keyboardClickHandling.js';
import isTouchDevice from './touchDeviceDetection.js';
import {flowingElements, removeAllElements, droppedElements} from './elementsTemplates.js';
import {startInterval, pauseRun, resumeFrozen, intervalElapsedTime} from './run.js';
import {resetHearts} from './heartsControl.js';
import {resetInventory} from './shipInventory.js';
import {swapButtonsFunctions, updateTouchState} from './screenTouchHandling.js';
import * as timer from './timerControl.js';
const startRound = () => {
  removeAllElements();
  startInterval(intervalElapsedTime);
  timer.startTimer(timer.intervalElapsedTime);
  resetHearts();
  enableAllKeys();
  hideOptions();
};
const endRound = () => {
  pauseRun();
  timer.pauseTimer();
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
  isBlurred = true;
  timer.pauseTimer();
  pauseRun();
  resetGameKeys();
});

window.addEventListener('focus', () => {
  isBlurred = false;
  if (!isBlurred && !isPaused && document.getElementById('optionsMask').classList.contains('hide')) {
    resumeFrozen();
    startInterval(intervalElapsedTime);
    timer.startTimer(timer.intervalElapsedTime);
  }
});
var isPaused = false;
document.getElementById('pauseButton').addEventListener('click', () => {
  isPaused = true;
  timer.pauseTimer();
  pauseRun();
  resetGameKeys();
  ShowPauseManu();
});
document.getElementById('resumeButton').addEventListener('click', () => {
  isPaused = false;
  resumeFrozen();
  startInterval(intervalElapsedTime);
  timer.startTimer(timer.intervalElapsedTime);
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

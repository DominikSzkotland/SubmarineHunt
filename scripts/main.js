import autoSwitchTheme from './themeChanger.js';
import spawnOffScreen from './spawnOffScreen.js';
import moveHorizontally from './moveHorizontally.js';
import adjustSize from './sizeAdjuster.js';
import updateClickState, {resetGameKeys} from './keyboardClickHandling.js';
import isTouchDevice from './touchDeviceDetection.js';
import {submarineTemplate, spawnedSubmarines, spawnedBombs} from './elementsTemplates.js';
import {startRound, pauseRun, resumeFrozen} from './run.js';

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
  adjustSize(spawnedSubmarines);
  adjustSize(document.getElementById('ship'));
  adjustSize(document.getElementById('pauseButton'));
  adjustSize(document.getElementById('resumeButton'));
  adjustSize(document.getElementById('restartButton'));
  adjustSize(document.getElementById('quitButton'));
  adjustSize(spawnedBombs);
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
    startRound();
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
  startRound();
  HidePauseManu();
});

export {isPaused, isBlurred};

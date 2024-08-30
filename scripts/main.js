import autoSwitchTheme from './themeChanger.js';
import spawnOffScreen from './spawnOffScreen.js';
import moveHorizontally from './moveHorizontally.js';
import adjustSize from './sizeAdjuster.js';
import updateClickState, {resetGameKeys} from './keyboardClickHandling.js';
import isTouchDevice from './touchDeviceDetection.js';
import {submarineTemplate, spawnedSubmarines, spawnedBombs} from './elementsTemplates.js';
import {startRound, pauseRun, resumeFrozen} from './run.js';
if (!isTouchDevice()) {
  const mobileSterringButtons = document.getElementsByClassName('mobileSterringButtons');
  const mobileSterringButtonsArray = Array.from(mobileSterringButtons);
  mobileSterringButtonsArray.forEach((element) => {
    element.remove();
  });
}
autoSwitchTheme();
document.getElementById('spawnSubmarineTemporaryButton').addEventListener('click', () => {
  spawnOffScreen(submarineTemplate);
});
document.getElementById('moveSubmarinesTemporaryButton').addEventListener('click', () => {
  spawnedSubmarines.forEach((submarine) => {
    moveHorizontally(submarine, 0.3);
  });
});
const Play = () => {
  document.getElementById('playBox').removeEventListener('click', Play);
  document.getElementById('welcomeMask').classList.add('hide');
  adjustSize(document.getElementById('ship'));
};
document.getElementById('playBox').addEventListener('click', Play);
window.addEventListener('resize', () => {
  adjustSize(spawnedSubmarines);
  adjustSize(document.getElementById('ship'));
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
  if (isBlurred && !isPaused) {
    resumeFrozen();
    startRound();
    isBlurred = false;
  }
});
var isPaused = false;
document.getElementById('pauseButton').addEventListener('click', () => {
  isPaused = true;
  pauseRun();
  resetGameKeys();
});
document.getElementById('resumeButton').addEventListener('click', () => {
  isPaused = false;
  resumeFrozen();
  startRound();
});

export {isPaused, isBlurred};

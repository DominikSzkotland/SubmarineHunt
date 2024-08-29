import autoSwitchTheme from './themeChanger.js';
import spawnOffScreen from './spawnOffScreen.js';
import moveHorizontally from './moveHorizontally.js';
import adjustSize from './sizeAdjuster.js';
import updateClickState from './keyboardClickHandling.js';
import isTouchDevice from './touchDeviceDetection.js';
import {submarineTemplate, spawnedSubmarines, spawnedBombs} from './elementsTemplates.js';
import {spawnAndMoveUnderWaterAndRepeat, stopMoveAbility} from './spawnAndMoveUnderWater.js';
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
document.getElementById('stopSubmarines').addEventListener('click', () => {
  stopMoveAbility();
});

const Start = () => {
  document.getElementById('startButton').removeEventListener('click', Start);
  document.getElementById('welcomeMask').classList.add('hide');
}
const Play = () => {
  document.getElementById('playButton').removeEventListener('click', Play);
  document.getElementById('settingsMask').classList.add('hide');
  adjustSize(document.getElementById('ship'));
  spawnAndMoveUnderWaterAndRepeat(submarineTemplate);
};
document.getElementById('startBox').addEventListener('click', Start);
document.getElementById('playBox').addEventListener('click', Play);

window.addEventListener('resize', () => {
  adjustSize(spawnedSubmarines);
  adjustSize(document.getElementById('ship'));
  adjustSize(spawnedBombs);
});

window.addEventListener('keydown', (event) => {
  updateClickState(event.code, true);
});
window.addEventListener('keyup', (event) => {
  updateClickState(event.code, false);
});

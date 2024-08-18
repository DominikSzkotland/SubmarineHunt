import autoSwitchTheme from './themeChanger.js';
import spawn from './spawn.js';
import moveHorizontally from './moveHorizontally.js';
import adjustSize from './sizeAdjuster.js';
import spawnUnderShip from './spawnUnderShip.js';
import updateClickState from './keyboardClickHandling.js';
import isTouchDevice from './touchDeviceDetection.js';
import {submarineTemplate, bombTemplate, spawnedSubmarines, spawnedBombs} from './elementsTemplates.js';

if (!isTouchDevice()) {
  const mobileSterringButtons = document.getElementsByClassName('mobileSterringButtons');
  const mobileSterringButtonsArray = Array.from(mobileSterringButtons);
  mobileSterringButtonsArray.forEach((element) => {
    element.remove();
  });
}

autoSwitchTheme();
document.getElementById('spawnSubmarineTemporaryButton').addEventListener('click', () => {
  spawnedSubmarines.push(spawn(submarineTemplate));
});
document.getElementById('moveSubmarinesTemporaryButton').addEventListener('click', () => {
  spawnedSubmarines.forEach((submarine) => {
    moveHorizontally(submarine, 0.3);
  });
});

document.getElementById('spawnBombTemporaryButton').addEventListener('click', () => {
  spawnedBombs.push(spawnUnderShip(bombTemplate));
  console.log(spawnedBombs);
});

const Play = () => {
  document.getElementById('playButton').removeEventListener('click', Play);
  document.getElementById('welcomeMask').classList.add('hide');
  adjustSize(document.getElementById('ship'));
};
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

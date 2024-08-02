import autoSwitchTheme from "./themeChanger.js";
import spawn from "./spawn.js";
import moveHorizontally from "./moveHorizontally.js";
import adjustSize from "./sizeAdjuster.js";
import updateClickState from "./keyboardClickHandling.js";
import { changeKeyForMoveLeft } from "./keyboardClickHandling.js";
import { changeKeyForMoveRight } from "./keyboardClickHandling.js";


const submarineTemplate = {'elementType':'submarine', 'styleClass':'submarine'}

const spawnedSubmarines = [];
autoSwitchTheme();
document.getElementById('spawnSubmarineTemporaryButton').addEventListener('click', () => {
    spawnedSubmarines.push(spawn(submarineTemplate));
});
document.getElementById('moveSubmarinesTemporaryButton').addEventListener('click', () => {
    spawnedSubmarines.forEach((submarine) => {
        moveHorizontally(submarine, 0.3);
    });
});
const Play = () => {
    document.getElementById('playButton').removeEventListener('click', Play);
    document.getElementById('welcomeMask').classList.add('hide')
    adjustSize(document.getElementById('ship'));
}
document.getElementById('playBox').addEventListener('click', Play);
window.addEventListener('resize', () => {
    adjustSize(spawnedSubmarines)
    adjustSize(document.getElementById('ship'))
});

window.addEventListener('keydown', (event) => {
        updateClickState(event.code, true);
});

window.addEventListener('keyup', (event) => {
        updateClickState(event.code, false);
});
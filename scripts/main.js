import autoSwitchTheme from "./themeChanger.js";
import spawn from "./spawn.js";
import moveHorizontally from "./moveHorizontally.js";
import adjustSize from "./sizeAdjuster.js";
import spawnUnderShip from "./spawnUnderShip.js";
import updateClickState from "./keyboardClickHandling.js";
import { changeKeyForMoveLeft } from "./keyboardClickHandling.js";
import { changeKeyForMoveRight } from "./keyboardClickHandling.js";

function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

if (isTouchDevice()) {
    console.log("Urządzenie obsługuje ekran dotykowy.");
} else {
    console.log("Urządzenie nie obsługuje ekranu dotykowego.");
}

function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

if (isTouchDevice()) {
    console.log("Urządzenie obsługuje ekran dotykowy.");
} else {
    console.log("Urządzenie nie obsługuje ekranu dotykowego.");
}

const submarineTemplate = {'elementType':'submarine', 'styleClass':'submarine'}
const bombTemplate = {'elementType':'bomb', 'styleClass':'bomb'}

const spawnedSubmarines = [];
const spawnedBombs = [];
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
})

const Play = () => {
    document.getElementById('playButton').removeEventListener('click', Play);
    document.getElementById('welcomeMask').classList.add('hide');
    adjustSize(document.getElementById('ship'));
}
document.getElementById('playBox').addEventListener('click', Play);
window.addEventListener('resize', () => {adjustSize(spawnedSubmarines)
    adjustSize(document.getElementById('ship'))
    adjustSize(spawnedBombs)
 });


window.addEventListener('keydown', (event) => {
    updateClickState(event.code, true);
});

window.addEventListener('keyup', (event) => {
    updateClickState(event.code, false);
});


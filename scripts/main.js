import autoSwitchTheme from "./themeChanger.js";
import spawn from "./spawn.js";
import moveHorizontally from "./moveHorizontally.js";
import adjustSize from "./sizeAdjuster.js";

function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

if (isTouchDevice()) {
    console.log("Urządzenie obsługuje ekran dotykowy.");
} else {
    console.log("Urządzenie nie obsługuje ekranu dotykowego.");
}

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
    document.getElementById('welcomeMask').classList.add('hide');
}
document.getElementById('playBox').addEventListener('click', Play);
window.addEventListener('resize', () => {adjustSize(spawnedSubmarines)});
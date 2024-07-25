import autoSwitchTheme from "./themeChanger.js";
import spawnSubmarine from "./spawnSubmarine.js";
import moveSubmarine from "./moveSubmarine.js";
import adjustSize from "./sizeAdjuster.js";

const spawnedSubmarines = [];
autoSwitchTheme();
document.getElementById('spawnSubmarineTemporaryButton').addEventListener('click', () => {
    spawnedSubmarines.push(spawnSubmarine());
});
document.getElementById('moveSubmarinesTemporaryButton').addEventListener('click', () => {
    spawnedSubmarines.forEach((submarine) => {
        moveSubmarine(submarine);
    });
});
const Play = () => {
    document.getElementById('playButton').removeEventListener('click', Play);
    document.getElementById('welcomeMask').classList.add('hide');
}
document.getElementById('playButton').addEventListener('click', Play);
window.addEventListener('resize', () => {adjustSize(spawnedSubmarines)});
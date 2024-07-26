import autoSwitchTheme from "./themeChanger.js";
import spawn from "./spawn.js";
import moveSubmarine from "./moveSubmarine.js";
import adjustSize from "./sizeAdjuster.js";

const submarineTemplate = {'elementType':'submarine', 'styleClass':'submarine'}

const spawnedSubmarines = [];
autoSwitchTheme();
document.getElementById('spawnSubmarineTemporaryButton').addEventListener('click', () => {
    spawnedSubmarines.push(spawn(submarineTemplate));
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
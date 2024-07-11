import autoSwitchTheme from "./themeChanger.js";
import spawnSubmarine from "./spawnSubmarine.js";

const spawnedSubmarines = [];
autoSwitchTheme();
document.getElementById('spawnSubmarineTemporaryButton').addEventListener('click', () => {
    spawnedSubmarines.push(spawnSubmarine());
    console.log(spawnedSubmarines);
});
const Play = () => {
    document.getElementById('playButton').removeEventListener('click', Play);
    document.getElementById('welcomeMask').classList.add('hide');
}
document.getElementById('playButton').addEventListener('click', Play);
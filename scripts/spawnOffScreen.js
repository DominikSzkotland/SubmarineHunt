import sizeAdjuster from './sizeAdjuster.js';
import {addToDB} from './elementsTemplates.js';
const spawnOffScreen = (TemplateOfElementToSpawn = null) => {
  if (!TemplateOfElementToSpawn) {
    console.error('Provided template is not valid!');
    return;
  }
  if (!TemplateOfElementToSpawn.elementType || !TemplateOfElementToSpawn.styleClass) {
    console.error('Provided template is not valid!');
    return;
  }
  const elementToSpawn = document.createElement('div');
  document.getElementById('ocean').appendChild(elementToSpawn);
  elementToSpawn.classList.add(TemplateOfElementToSpawn.styleClass);
  elementToSpawn.setAttribute('data-elementType', TemplateOfElementToSpawn.elementType);
  const leftOrRight = Math.random() < 0.5 ? 0 : 1;
  if (leftOrRight === 0) {
    elementToSpawn.style.left = 'auto';
    elementToSpawn.style.right = '100%';
    elementToSpawn.setAttribute('data-turn', 'left');
  } else {
    elementToSpawn.style.right = 'auto';
    elementToSpawn.style.left = '100%';
    elementToSpawn.setAttribute('data-turn', 'right');
  }
  elementToSpawn.style.top = Math.random() * 100 + '%';
  sizeAdjuster(elementToSpawn);
  adjustAltitude(elementToSpawn);
  addToDB(elementToSpawn);
  return elementToSpawn;
};
const adjustAltitude = (elementToSpawn) => {
  const oceanHeight = document.getElementById('ocean').offsetHeight;
  const elementToSpawnAltitude = elementToSpawn.offsetTop;
  const elementToSpawnHeight = elementToSpawn.offsetHeight;
  if (oceanHeight - elementToSpawnAltitude < elementToSpawnHeight) {
    elementToSpawn.style.top = 'auto';
    elementToSpawn.style.bottom = '0';
  }
};
export default spawnOffScreen;

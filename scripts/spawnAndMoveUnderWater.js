import { submarineTemplate, spawnedSubmarines } from "./elementsTemplates.js";
import moveHorizontally from "./moveHorizontally.js";
import spawnOffScreen from "./spawnOffScreen.js";

let timeout;

const stopMoveAbility = () => {
  clearTimeout(timeout);
}

const moveAll = (arrayToWorkWith, speed) => { 
  spawnOffScreen(submarineTemplate);
  arrayToWorkWith.forEach((element) => {
     moveHorizontally(element, speed); 
    });
  }

const spawnAndMoveUnderWater = (TemplateOfElementToSpawn = {elementType: undefined, styleClass: undefined}) => {
  console.log(TemplateOfElementToSpawn.elementType);
  switch (TemplateOfElementToSpawn.elementType) { 
    case 'submarine': moveAll(spawnedSubmarines, 0.3) 
      break;
    default: console.error('You are trying move undefined element unsing interval??? idk chose proper message'); 
  }
}

const spawnAndMoveUnderWaterAndRepeat = (TemplateOfElementToSpawn = {elementType: undefined, styleClass: undefined}) => {
  spawnAndMoveUnderWater(TemplateOfElementToSpawn);
  let waitTime = Math.random() * (4000 - 1000) + 1000; 
  timeout = setTimeout(() => spawnAndMoveUnderWaterAndRepeat(TemplateOfElementToSpawn), waitTime);
}

export {spawnAndMoveUnderWaterAndRepeat, stopMoveAbility};
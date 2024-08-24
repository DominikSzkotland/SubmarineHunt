import { submarineTemplate, spawnedSubmarines } from "./elementsTemplates.js";
import moveHorizontally from "./moveHorizontally.js";
import spawnOffScreen from "./spawnOffScreen.js";

  const spawnAndMoveUnderWater = (TemplateOfElementToSpawn = {elementType: undefined, styleClass: undefined}) => {
    if(TemplateOfElementToSpawn.elementType == 'submarine'){  
      spawnOffScreen(submarineTemplate);
      spawnedSubmarines.forEach((submarine) => {
        moveHorizontally(submarine, 0.3);
      });
    }
  }

  const spawnAndMoveUnderWaterAndRepeat = (TemplateOfElementToSpawn = {elementType: undefined, styleClass: undefined}) => {
    spawnAndMoveUnderWater(TemplateOfElementToSpawn);
    let waitTime = Math.random() * (4000 - 1000) + 1000; 
    setTimeout(() => spawnAndMoveUnderWaterAndRepeat(TemplateOfElementToSpawn), waitTime);
  }



  export default spawnAndMoveUnderWaterAndRepeat;
const droppedElements = [];
const flowingElements = [];
let animationsIDs = [];
const spawnedSubmarines = [];
const spawnedBombs = [];

const getNewAnimationFrame = (functionToExecute = () => {}) => {
  const animationID = requestAnimationFrame(() => {
    functionToExecute();
  });
  animationsIDs.push(animationID);
  return animationID;
};

const removeAllElements = () => {
  const FlowingElementsArrayLength = flowingElements.length;
  for (let i = 0; i < FlowingElementsArrayLength; i++) {
    removeElement(flowingElements[0]);
  }

  const DroppedElementsArrayLength = droppedElements.length;
  for (let i = 0; i < DroppedElementsArrayLength; i++) {
    removeElement(droppedElements[0]);
  }
};

const removeAnimationIDFromList = (animationID) => {
  animationsIDs = animationsIDs.filter((id) => id !== animationID);
};

const cancelAllAnimationFrames = () => {
  animationsIDs.forEach((animationID) => {
    cancelAnimationFrame(animationID);
  });
  animationsIDs = [];
};
const addToDB = (elementToSpawn) => {
  switch (elementToSpawn.getAttribute('data-elementType')) {
    case 'submarine':
      spawnedSubmarines.push(elementToSpawn);
      flowingElements.push(elementToSpawn);
      break;
    case 'bomb':
      spawnedBombs.push(elementToSpawn);
      droppedElements.push(elementToSpawn);
      break;
    default:
      console.error('You are trying to add an undefined element to the database!');
  }
};

const removeElement = (elementToRemove) => {
  switch (elementToRemove.getAttribute('data-elementType')) {
    case 'submarine':
      removeSubmarine(elementToRemove);
      elementToRemove.remove();
      break;
    case 'bomb':
      removeBomb(elementToRemove);
      elementToRemove.remove();
      break;
    default:
      console.error('You are trying to remove an undefined element!');
  }
};

const removeSubmarine = (submarine) => {
  spawnedSubmarines.splice(spawnedSubmarines.indexOf(submarine), 1);
  flowingElements.splice(flowingElements.indexOf(submarine), 1);
  if (submarine.getAttribute('data-animation-id')) {
    removeAnimationIDFromList(submarine.getAttribute('data-animation-id'));
    cancelAnimationFrame(submarine.getAttribute('data-animation-id'));
  }
};
const removeBomb = (bomb) => {
  spawnedBombs.splice(spawnedBombs.indexOf(bomb), 1);
  droppedElements.splice(droppedElements.indexOf(bomb), 1);
  if (bomb.getAttribute('data-animation-id')) {
    removeAnimationIDFromList(bomb.getAttribute('data-animation-id'));
    cancelAnimationFrame(bomb.getAttribute('data-animation-id'));
  }
};

/*
  TODO: dodaj do szblonów wartość speed.
  i ogarnij potem wwszystkie prędkości w kodzie

  później prędkości będą regulowane poziomem trudności 
  p. 200 jednostek * 0.5 (poziom normalny) lub 200 jednostek * 0.8 (p. trudny)
*/

const elementTemplates = {
  submarine: {elementType: 'submarine', styleClass: 'submarine', pointValue: 10, speed: 0.3},
  bomb: {elementType: 'bomb', styleClass: 'bomb', pointValue: 0, speed: 0.7},
};

export {
  elementTemplates,
  spawnedSubmarines,
  spawnedBombs,
  droppedElements,
  flowingElements,
  removeElement,
  addToDB,
  getNewAnimationFrame,
  cancelAllAnimationFrames,
  removeAnimationIDFromList,
  removeAllElements,
};

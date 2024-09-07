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
      break;
    case 'bomb':
      removeBomb(elementToRemove);
      break;
    default:
      console.error('You are trying to remove an undefined element!');
  }
  elementToRemove.remove();
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

const submarineTemplate = {elementType: 'submarine', styleClass: 'submarine'};
const bombTemplate = {elementType: 'bomb', styleClass: 'bomb'};

export {
  submarineTemplate,
  bombTemplate,
  spawnedSubmarines,
  spawnedBombs,
  droppedElements,
  flowingElements,
  removeElement,
  addToDB,
  getNewAnimationFrame,
  cancelAllAnimationFrames,
  removeAnimationIDFromList,
};

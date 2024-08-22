const droppedElements = [];
const flowingElements = [];

const spawnedSubmarines = [];
const spawnedBombs = [];

const removeSubmarine = (submarine) => {
  spawnedSubmarines.splice(spawnedSubmarines.indexOf(submarine), 1);
  flowingElements.splice(flowingElements.indexOf(submarine), 1);
};
const removeBomb = (bomb) => {
  spawnedBombs.splice(spawnedBombs.indexOf(bomb), 1);
  droppedElements.splice(droppedElements.indexOf(bomb), 1);
};
const submarineTemplate = {elementType: 'submarine', styleClass: 'submarine'};
const bombTemplate = {elementType: 'bomb', styleClass: 'bomb'};

export {submarineTemplate, bombTemplate, spawnedSubmarines, spawnedBombs, droppedElements, flowingElements, removeSubmarine, removeBomb};

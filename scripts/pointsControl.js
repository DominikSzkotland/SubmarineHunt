const htmlPointsOutputs = [];
let points = 0;

const addHtmlOutput = (htmlElement = null) => {
  if (htmlElement instanceof HTMLElement) {
    htmlPointsOutputs.push(htmlElement);
  } else {
    console.error('You are trying to add an undefined element to the database!');
  }
};
const removeHtmlOutput = (htmlElement = null) => {
  if (htmlElement instanceof HTMLElement) {
    const index = htmlPointsOutputs.indexOf(htmlElement);
    if (index > -1) {
      htmlPointsOutputs.splice(index, 1);
    } else {
      console.warn('Element not found in the database!');
    }
  } else {
    console.error('You are trying to remove an undefined element from the database!');
  }
};

const add = (pointsToAdd = 0) => {
  if (typeof pointsToAdd === 'number') {
    points += pointsToAdd;
    updatePoints();
  } else if (typeof pointsToAdd === 'string') {
    pointsToAdd = parseInt(pointsToAdd, 10);
    if (!isNaN(pointsToAdd)) {
      points += pointsToAdd;
      updatePoints();
    } else {
      console.error('Points must be a number!');
    }
  } else {
    console.error('Points must be a number!');
  }
};
const subtract = (pointsToRemove = 0) => {
  if (typeof pointsToRemove === 'number') {
    points -= pointsToRemove;
    updatePoints();
  } else if (typeof pointsToRemove === 'string') {
    pointsToRemove = parseInt(pointsToRemove, 10);
    if (!isNaN(pointsToRemove)) {
      points -= pointsToRemove;
      updatePoints();
    } else {
      console.error('Points must be a number!');
    }
  } else {
    console.error('Points must be a number!');
  }
};

const reset = () => {
  points = 0;
  updatePoints();
};

const updatePoints = () => {
  htmlPointsOutputs.forEach((element) => {
    element.innerHTML = points;
  });
};

export {add, subtract, reset, addHtmlOutput, removeHtmlOutput};

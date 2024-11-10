import {isBlurred, isPaused} from './main.js';
import {moveShip, stopMovingShip} from './moveShip.js';
import performShipAction from './performShipAction.js';
import {switchToNextItem} from './shipInventory.js';

let buttonForMoveLeft = document.getElementById('moveLeftButton').id;
let buttonForMoveRight = document.getElementById('moveRightButton').id;
let buttonForPerformingAction = document.getElementById('dropButtonLeft').id;
let buttonForPerformingAction2 = document.getElementById('dropButtonRight').id;
let buttonForSwitchingToNextItem = document.getElementById('switchItemButton').id;

const changeButtonForMoveLeft = (newButtonid) => {
  buttonForMoveLeft = newButtonid;
  updateButtonBindings();
};

const changeButtonForMoveRight = (newButtonid) => {
  buttonForMoveRight = newButtonid;
  updateButtonBindings();
};

const changeButtonForPerformingAction = (newButtonid) => {
  buttonForPerformingAction = newButtonid;
  updateButtonBindings();
};

const changeButtonForSwitchingToNextItem = (newButtonid) => {
  buttonForSwitchingToNextItem = newButtonid;
  updateButtonBindings();
};

const swapButtonsFunctions = (button1, button2) => {
  let button1Function;
  let neededChangeFunction1;
  switch (button1) {
    case 'moveLeftButton':
      button1Function = buttonForMoveLeft;
      neededChangeFunction1 = changeButtonForMoveLeft;
      break;
    case 'moveRightButton':
      button1Function = buttonForMoveRight;
      neededChangeFunction1 = changeButtonForMoveRight;
      break;
    case 'dropButtonLeft':
      button1Function = buttonForPerformingAction;
      neededChangeFunction1 = changeButtonForPerformingAction;
      break;
    case 'dropButtonRight':
      button1Function = buttonForPerformingAction2;
      neededChangeFunction1 = changeButtonForPerformingAction;
      break;
    case 'switchItemButton':
      button1Function = buttonForSwitchingToNextItem;
      neededChangeFunction1 = changeButtonForSwitchingToNextItem;
      break;
  }

  let button2Function;
  let neededChangeFunction2;
  switch (button2) {
    case 'moveLeftButton':
      button2Function = buttonForMoveLeft;
      neededChangeFunction2 = changeButtonForMoveLeft;
      break;
    case 'moveRightButton':
      button2Function = buttonForMoveRight;
      neededChangeFunction2 = changeButtonForMoveRight;
      break;
    case 'dropButtonLeft':
      button2Function = buttonForPerformingAction;
      neededChangeFunction2 = changeButtonForPerformingAction;
      break;
    case 'dropButtonRight':
      button2Function = buttonForPerformingAction2;
      neededChangeFunction2 = changeButtonForPerformingAction;
      break;
    case 'switchItemButton':
      button2Function = buttonForSwitchingToNextItem;
      neededChangeFunction2 = changeButtonForSwitchingToNextItem;
      break;
  }

  neededChangeFunction1(button2Function);
  neededChangeFunction2(button1Function);
};

const updateButtonBindings = () => {
  gameButtons = {
    [buttonForMoveLeft]: {pressed: false, disabled: false},
    [buttonForMoveRight]: {pressed: false, disabled: false},
    [buttonForPerformingAction]: {pressed: false, disabled: false},
    [buttonForPerformingAction2]: {pressed: false, disabled: false},
    [buttonForSwitchingToNextItem]: {pressed: false, disabled: false},
  };

  buttonBindings = {
    [buttonForMoveLeft]: {press: () => moveShip('left', 0.45), release: () => stopMovingShip('left')},
    [buttonForMoveRight]: {press: () => moveShip('right', 0.45), release: () => stopMovingShip('right')},
    [buttonForPerformingAction]: {press: () => performShipAction(), release: () => {}},
    [buttonForPerformingAction2]: {press: () => performShipAction(), release: () => {}},
    [buttonForSwitchingToNextItem]: {press: () => switchToNextItem(), release: () => {}},
  };
};

let gameButtons = {};
let buttonBindings = {};
updateButtonBindings();

const resetGameButtons = () => {
  Object.keys(gameButtons).forEach((button) => {
    gameButtons[button].pressed = false;
    if (buttonBindings[button] && buttonBindings[button].release) {
      buttonBindings[button].release();
    }
  });
};

const disableAllButtons = () => {
  Object.keys(gameButtons).forEach((button) => {
    gameButtons[button].disabled = true;
  });
};

const enableAllButtons = () => {
  Object.keys(gameButtons).forEach((button) => {
    gameButtons[button].disabled = false;
  });
};

const updateTouchState = (button, isPressed) => {
  if (isBlurred || isPaused) {
    return;
  }
  if (button in gameButtons && gameButtons[button].pressed !== isPressed && !gameButtons[button].disabled) {
    gameButtons[button].pressed = isPressed;
    if (isPressed) {
      if (buttonBindings[button] && buttonBindings[button].press) {
        buttonBindings[button].press();
      }
    } else {
      if (buttonBindings[button] && buttonBindings[button].release) {
        buttonBindings[button].release();
      }
    }
  }
};

export {updateTouchState, resetGameButtons, disableAllButtons, enableAllButtons, swapButtonsFunctions};

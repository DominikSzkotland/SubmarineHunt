import {isBlurred, isPaused} from './main.js';
import {moveShip, stopMovingShip} from './moveShip.js';
import performShipAction from './performShipAction.js';
import {switchToNextItem} from './shipInventory.js';

let buttonForMoveLeft = document.getElementById('leftButton').id;
let buttonForMoveRight = document.getElementById('rightButton').id;
let buttonForPerformingAction = document.getElementById('actionButtonLeft').id;
let buttonForSwitchingToNextItem = document.getElementById('actionButtonRight').id;

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
    case 'leftButton':
      button1Function = buttonForMoveLeft;
      neededChangeFunction1 = changeButtonForMoveLeft;
      break;
    case 'rightButton':
      button1Function = buttonForMoveRight;
      neededChangeFunction1 = changeButtonForMoveRight;
      break;
    case 'actionButtonLeft':
      button1Function = buttonForPerformingAction;
      neededChangeFunction1 = changeButtonForPerformingAction;
      break;
    case 'actionButtonRight':
      button1Function = buttonForSwitchingToNextItem;
      neededChangeFunction1 = changeButtonForSwitchingToNextItem;
      break;
  }

  let button2Function;
  let neededChangeFunction2;
  switch (button2) {
    case 'leftButton':
      button2Function = buttonForMoveLeft;
      neededChangeFunction2 = changeButtonForMoveLeft;
      break;
    case 'rightButton':
      button2Function = buttonForMoveRight;
      neededChangeFunction2 = changeButtonForMoveRight;
      break;
    case 'actionButtonLeft':
      button2Function = buttonForPerformingAction;
      neededChangeFunction2 = changeButtonForPerformingAction;
      break;
    case 'actionButtonRight':
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
    [buttonForSwitchingToNextItem]: {pressed: false, disabled: false},
  };

  buttonBindings = {
    [buttonForMoveLeft]: {press: () => moveShip('left', 0.45), release: () => stopMovingShip('left')},
    [buttonForMoveRight]: {press: () => moveShip('right', 0.45), release: () => stopMovingShip('right')},
    [buttonForPerformingAction]: {press: () => performShipAction(), release: () => {}},
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

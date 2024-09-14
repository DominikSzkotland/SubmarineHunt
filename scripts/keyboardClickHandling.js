import {isBlurred, isPaused} from './main.js';
import {moveShip, stopMovingShip} from './moveShip.js';
import performShipAction from './performShipAction.js';
import {switchToNextItem} from './shipInventory.js';

let keyForMoveLeft = 'KeyA';
let keyForMoveRight = 'KeyD';
let keyForPerformingAction = 'KeyS';
let keyForSwitchingToNextItem = 'KeyW';

const changeKeyForMoveLeft = (newKeyCode) => {
  keyForMoveLeft = newKeyCode;
  updateKeyBindings();
};

const changeKeyForMoveRight = (newKeyCode) => {
  keyForMoveRight = newKeyCode;
  updateKeyBindings();
};

const changeKeyForPerformingAction = (newKeyCode) => {
  keyForPerformingAction = newKeyCode;
  updateKeyBindings();
};

const changeKeyForSwitchingToNextItem = (newKeyCode) => {
  keyForSwitchingToNextItem = newKeyCode;
  updateKeyBindings();
};

const updateKeyBindings = () => {
  gameKeys = {
    [keyForMoveLeft]: {pressed: false, disabled: false},
    [keyForMoveRight]: {pressed: false, disabled: false},
    [keyForPerformingAction]: {pressed: false, disabled: false},
    [keyForSwitchingToNextItem]: {pressed: false, disabled: false},
  };

  keyBindings = {
    [keyForMoveLeft]: {press: () => moveShip('left', 0.45), release: () => stopMovingShip('left')},
    [keyForMoveRight]: {press: () => moveShip('right', 0.45), release: () => stopMovingShip('right')},
    [keyForPerformingAction]: {press: () => performShipAction(), release: () => {}},
    [keyForSwitchingToNextItem]: {press: () => switchToNextItem(), release: () => {}},
  };
};

let gameKeys = {};
let keyBindings = {};
updateKeyBindings();

const resetGameKeys = () => {
  Object.keys(gameKeys).forEach((key) => {
    gameKeys[key].pressed = false;
    if (keyBindings[key] && keyBindings[key].release) {
      keyBindings[key].release();
    }
  });
};

const disableAllKeys = () => {
  Object.keys(gameKeys).forEach((key) => {
    gameKeys[key].disabled = true;
  });
};

const enableAllKeys = () => {
  Object.keys(gameKeys).forEach((key) => {
    gameKeys[key].disabled = false;
  });
};

const updateClickState = (code, isPressed) => {
  if (isBlurred || isPaused) {
    return;
  }
  if (code in gameKeys && gameKeys[code].pressed !== isPressed && !gameKeys[code].disabled) {
    gameKeys[code].pressed = isPressed;
    if (isPressed) {
      if (keyBindings[code] && keyBindings[code].press) {
        keyBindings[code].press();
      }
    } else {
      if (keyBindings[code] && keyBindings[code].release) {
        keyBindings[code].release();
      }
    }
  }
};

export {
  updateClickState,
  changeKeyForMoveLeft,
  changeKeyForMoveRight,
  changeKeyForPerformingAction,
  changeKeyForSwitchingToNextItem,
  resetGameKeys,
  disableAllKeys,
  enableAllKeys,
};

import {moveShip, stopMovingShip} from "./moveShip.js";

let keyForMoveLeft = 'KeyA';
let keyForMoveRight = 'KeyD';

const changeKeyForMoveLeft = (newKeyCode) => {
    keyForMoveLeft = newKeyCode;
    updateKeyBindings();
};

const changeKeyForMoveRight = (newKeyCode) => {
    keyForMoveRight = newKeyCode;
    updateKeyBindings();
};

const updateKeyBindings = () => {
    gameKeys = {
        [keyForMoveLeft]: { pressed: false },
        [keyForMoveRight]: { pressed: false }
    };

    keyBindings = {
        [keyForMoveLeft]: { press: () => moveShip('left', 0.4), release: () => stopMovingShip() },
        [keyForMoveRight]: { press: () => moveShip('right', 0.4), release: () => stopMovingShip() }
    };
};

let gameKeys = {};
let keyBindings = {};
updateKeyBindings();

const updateClickState = (code, isPressed) => {
    if (code in gameKeys && gameKeys[code].pressed !== isPressed) {
        gameKeys[code].pressed = isPressed;
        if (isPressed) {
            if (keyBindings[code] && keyBindings[code].press) {
                keyBindings[code].press();
            }
        } 
        else {
            if (keyBindings[code] && keyBindings[code].release) {
                keyBindings[code].release();
            }
        }
    }
};

export default updateClickState;
export {changeKeyForMoveLeft, changeKeyForMoveRight};
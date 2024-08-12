const ship = document.getElementById('ship');
const sky = document.getElementById('sky');
let rideRightAnimationID = null;
let rideLeftAnimationID = null;
const moveShip = (direction, moveSpeed) => {
    if(rideRightAnimationID !== null && rideLeftAnimationID !== null) {
        stopMovingShip();
    }
    if (direction === 'left') {
        rideLeftAnimationID = requestAnimationFrame(() => moveShipTowardsLeft(moveSpeed));
    }
    else if (direction === 'right') {
        rideRightAnimationID = requestAnimationFrame(() => moveShipTowardsRight(moveSpeed));
    } 
    else {
        console.error('Invalid/undefined direction!');
    }
}
const moveShipTowardsRight = (moveSpeed) => {
    if(ship.offsetLeft + ship.offsetWidth < sky.offsetWidth) {
        const currentLeftPercent = parseFloat(ship.style.left) || 0;
        ship.style.left = `${currentLeftPercent + moveSpeed}%`;
        rideRightAnimationID = requestAnimationFrame(() => moveShipTowardsRight(moveSpeed));
    }
}
const moveShipTowardsLeft = (moveSpeed) => {
    if(ship.offsetLeft > 0) {
        const currentLeftPercent = parseFloat(ship.style.left) || 0;
        ship.style.left = `${currentLeftPercent - moveSpeed}%`;
        rideLeftAnimationID = requestAnimationFrame(() => moveShipTowardsLeft(moveSpeed));
    };
}
const stopMovingShip = () => {
    cancelAnimationFrame(rideRightAnimationID);
    cancelAnimationFrame(rideLeftAnimationID);
    rideRightAnimationID = null;
    rideLeftAnimationID = null;
}
export {moveShip, stopMovingShip};

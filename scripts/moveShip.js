const ship = document.getElementById('ship');
const sky = document.getElementById('sky');
let animationID = null;
const moveShip = (direction, moveSpeed) => {
    if(animationID !== null) {
        stopMovingShip();
    }
    if (direction === 'left') {
        animationID = requestAnimationFrame(() => moveShipTowardsLeft(moveSpeed));
    }
    else if (direction === 'right') {
        animationID = requestAnimationFrame(() => moveShipTowardsRight(moveSpeed));
    } 
    else {
        console.error('Invalid/undefined direction!');
    }
}
const moveShipTowardsRight = (moveSpeed) => {
    if(ship.offsetLeft + ship.offsetWidth < sky.offsetWidth) {
        const currentLeftPercent = parseFloat(ship.style.left) || 0;
        ship.style.left = `${currentLeftPercent + moveSpeed}%`;
        animationID = requestAnimationFrame(() => moveShipTowardsRight(moveSpeed));
    }
}
const moveShipTowardsLeft = (moveSpeed) => {
    if(ship.offsetLeft > 0) {
        const currentLeftPercent = parseFloat(ship.style.left) || 0;
        ship.style.left = `${currentLeftPercent - moveSpeed}%`;
        animationID = requestAnimationFrame(() => moveShipTowardsLeft(moveSpeed));
    };
}
const stopMovingShip = () => {
    cancelAnimationFrame(animationID);
    animationID = null;
}
export {moveShip, stopMovingShip};

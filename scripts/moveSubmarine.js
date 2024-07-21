const ocean = document.getElementById('ocean');
const moveSpeed = 0.5;
const moveSubmarine = (submarine) => {
    if (submarine.getAttribute('data-moving') === 'true') {
        return;
    }
    submarine.setAttribute('data-moving', 'true');
    switch(submarine.getAttribute('data-turn')) {
        case 'left':
            requestAnimationFrame(() => moveSubmarineTowardsRightSide(submarine));
            break;
        case 'right':
            requestAnimationFrame(() => moveSubmarineTowardsLeftSide(submarine));
            break;
    }
}

const moveSubmarineTowardsRightSide = (submarine) => {
    submarine.style.right = `${parseFloat(submarine.style.right) - moveSpeed}%`;
    if(submarine.offsetLeft < ocean.offsetWidth){
        requestAnimationFrame(() => moveSubmarineTowardsRightSide(submarine));
    }
    else{
        submarine.remove();
    }
}

const moveSubmarineTowardsLeftSide = (submarine) => {
    submarine.style.left = `${parseFloat(submarine.style.left) - moveSpeed}%`;
    if(submarine.offsetLeft + submarine.offsetWidth > 0){
        requestAnimationFrame(() => moveSubmarineTowardsLeftSide(submarine));
    }
    else{
        submarine.remove();
    }
}

export default moveSubmarine
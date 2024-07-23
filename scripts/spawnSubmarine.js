import sizeAdjuster from "./sizeAdjuster.js";
const spawnSubmarine = () => {
    const submarine = document.createElement('div');
    document.getElementById('ocean').appendChild(submarine);
    submarine.classList.add('submarine');
    submarine.setAttribute('data-elementType', 'submarine');
    sizeAdjuster(submarine);
    const leftOrRight = Math.random() < 0.5 ? 0 : 1;
    
    if(leftOrRight === 0) {
        submarine.style.left = 'auto';
        submarine.style.right = '100%';
        submarine.setAttribute('data-turn', 'left');
    }
    else{
        submarine.style.right = 'auto';
        submarine.style.left = '100%';
        submarine.setAttribute('data-turn', 'right');
    }
    submarine.style.top = Math.random() * 100 + '%';
    adjustAltitude(submarine);
    return submarine;
}

const adjustAltitude = (submarine) => {
    const oceanHeight = document.getElementById('ocean').offsetHeight;
    const submarineAltitude = submarine.offsetTop;
    const submarineHeight = submarine.offsetHeight;
    if(oceanHeight - submarineAltitude < submarineHeight){
        submarine.style.top = 'auto';
        submarine.style.bottom = '0';
    }
}


export default spawnSubmarine;
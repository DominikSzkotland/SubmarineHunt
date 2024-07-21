const spawnSubmarine = () => {
    const submarine = document.createElement('div');
    submarine.classList.add('submarine');
    const leftOrRight = Math.random() < 0.5 ? 0 : 1;
    document.getElementById('ocean').appendChild(submarine);
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
    if(oceanHeight - submarineAltitude < submarineHeight) {console.log(submarine)
        submarine.style.top = 'auto';
        submarine.style.bottom = '0';
    }
}


export default spawnSubmarine;
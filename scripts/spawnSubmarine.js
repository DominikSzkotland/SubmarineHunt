const spawnSubmarine = () => {
    const submarine = document.createElement('div');
    submarine.classList.add('submarine');
    const leftOrRight = Math.random() < 0.5 ? 0 : 1;
    document.getElementById('ocean').appendChild(submarine);
    submarine.style.left = leftOrRight === 0 ? 'calc(' + leftOrRight * 100 + '% - ' + submarine.offsetWidth + 'px)' : leftOrRight * 100 + '%';
    submarine.style.top = Math.random() * 100 + '%';
    adjustAltitude(submarine);
    return submarine;
}

const adjustAltitude = (submarine) => {
    const oceanHeight = document.getElementById('ocean').offsetHeight;
    const submarineAltitude = submarine.offsetTop;
    const submarineHeight = submarine.offsetHeight;
    if(oceanHeight + submarineAltitude < oceanHeight + submarineHeight) {
        submarine.top = 'auto';
        submarine.bottom = '0';
    }
}


export default spawnSubmarine;
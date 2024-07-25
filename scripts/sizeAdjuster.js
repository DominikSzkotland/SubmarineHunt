const adjustSize = (elementsToAdjust) => {
    if(Array.isArray(elementsToAdjust) === true) {
        elementsToAdjust.forEach(element => {
            detectAndAdjustSize(element);
        });
    }
    else
    {
        detectAndAdjustSize(elementsToAdjust);
    }
    return elementsToAdjust;
}

const detectAndAdjustSize = (element) => {
    switch(element.getAttribute('data-elementType')) {
        case 'submarine':
            const submarine = element;
            submarine.style.width = Math.floor(1.8 * submarine.offsetHeight) + 'px';
            break;
        case 'powerUp':
            break;
        default:
            console.error('You are trying to adjust an undefined element!');
            break;
    }
}

export default adjustSize
import sizeAdjuster from "./sizeAdjuster.js";
const spawnUnderShip = (TemplateOfElementToSpawn = {'elementType':undefined, 'styleClass':undefined}) => {
    const elementToSpawn = document.createElement('div');
    const shipElement = document.getElementById('ship');
    document.getElementById('ocean').appendChild(elementToSpawn);
    const oceanElement = document.getElementById('ocean');
    elementToSpawn.classList.add(TemplateOfElementToSpawn.styleClass);
    elementToSpawn.setAttribute('data-elementType', TemplateOfElementToSpawn.elementType);
    sizeAdjuster(elementToSpawn);
    elementToSpawn.style.top = 0;
    const shipMiddle = shipElement.offsetLeft + (shipElement.offsetWidth / 2) - (elementToSpawn.offsetWidth / 2)
    const skyWidth = document.getElementById('sky').offsetWidth;
    elementToSpawn.style.left = `${(shipMiddle / skyWidth) * 100}%`
    return elementToSpawn;
}

export default spawnUnderShip;
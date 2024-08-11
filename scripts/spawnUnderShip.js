import sizeAdjuster from "./sizeAdjuster.js";
const spawnUnderShip = (TemplateOfElementToSpawn = {'elementType':undefined, 'styleClass':undefined}) => {
    const elementToSpawn = document.createElement('div');
    const shipElement = document.getElementById('ship');
    document.getElementById('ocean').appendChild(elementToSpawn);
    elementToSpawn.classList.add(TemplateOfElementToSpawn.styleClass);
    elementToSpawn.setAttribute('data-elementType', TemplateOfElementToSpawn.elementType);
    sizeAdjuster(elementToSpawn);
    elementToSpawn.style.top = 0;
    elementToSpawn.style.left = `${shipElement.offsetLeft + (shipElement.offsetWidth / 2) - (elementToSpawn.offsetWidth / 2)}px`;
    return elementToSpawn;
}

export default spawnUnderShip;
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
    const shipLeftRelativeToOcean = shipElement.offsetLeft - oceanElement.offsetLeft;
    const leftPercent = ((shipLeftRelativeToOcean + (shipElement.offsetWidth / 2)) / oceanElement.offsetWidth) * 100;
    elementToSpawn.style.left = `${leftPercent}%`;

    return elementToSpawn;
}

export default spawnUnderShip;
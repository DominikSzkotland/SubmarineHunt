import sizeAdjuster from "./sizeAdjuster.js";
const spawnUnderShip = (TemplateOfElementToSpawn = {'elementType':undefined, 'styleClass':undefined}) => {
    const elementToSpawn = document.createElement('div');
    const shipElement = document.getElementById('ship');
    shipElement.appendChild(elementToSpawn);
    elementToSpawn.classList.add(TemplateOfElementToSpawn.styleClass);
    elementToSpawn.setAttribute('data-elementType', TemplateOfElementToSpawn.elementType);
    sizeAdjuster(elementToSpawn);
    const shipRect = shipElement.getBoundingClientRect();
    const elementToSpawnHeight = elementToSpawn.offsetHeight;
    const elementToSpawnWidth = elementToSpawn.offsetWidth;
    console.log("rozmiar ",elementToSpawnHeight," ", elementToSpawnWidth)
    elementToSpawn.style.top = `${shipRect.bottom}px`;
    elementToSpawn.style.left = `${shipRect.left + (shipRect.width / 2) - (elementToSpawnWidth / 2)}px`;

    return elementToSpawn;
}

export default spawnUnderShip;
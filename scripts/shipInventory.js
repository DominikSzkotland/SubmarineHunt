import spawnUnderShip from './spawnUnderShip.js';
import {elementTemplates, addToDB, spawnedBombs} from './elementsTemplates.js';
import fall from './InventoryElementsSpecialActions/bombFall.js';
const ammoTypeStatusBar = document.getElementById('ammoType');
const ammoCountStatusBar = document.getElementById('ammoCount');

const updateAmmoInStatusBar = () => {
  ammoTypeStatusBar.innerHTML = `Ammo: ${shipActiveItem.name}`;
  ammoCountStatusBar.innerHTML = `Count: ${shipActiveItem.count}`;
};
const switchToNextItem = () => {
  shipInventoryIndex++;
  if (shipInventoryIndex > shipInventory.length - 1) {
    shipInventoryIndex = 0;
  }
  shipActiveItem = shipInventory[shipInventoryIndex];
  updateAmmoInStatusBar();
  return shipActiveItem;
};

const addItemToInventory = (
  itemTemplate = {
    name: '',
    count: 0,
    action: () => {},
    infinite: false,
  }
) => {
  if (itemTemplate.count <= 0 && !itemTemplate.infinite) {
    return;
  }
  shipInventory.push(itemTemplate);
};

const removeActiveItem = () => {
  shipInventory.splice(shipInventoryIndex, 1);
  switchToNextItem();
  updateAmmoInStatusBar();
  return shipActiveItem;
};

const useActiveItem = () => {
  if (shipActiveItem.count <= 0 && !shipActiveItem.infinite) {
    removeActiveItem();
  } else if (shipActiveItem.count <= 0 && shipActiveItem.infinite) {
    return;
  } else {
    shipActiveItem.count--;
    shipActiveItem.action();
  }
  updateAmmoInStatusBar();
  if (shipActiveItem.count <= 0 && !shipActiveItem.infinite) {
    removeActiveItem();
  }
  if (shipActiveItem.count <= 0 && shipActiveItem.infinite) {
    return;
  }
};

let shipInventory = [];
let shipInventoryIndex = 0;
let shipActiveItem = shipInventory[shipInventoryIndex];
const resetInventory = () => {
  shipInventory = [
    {
      name: 'Bomb',
      count: 3,
      action: () => {
        addToDB(spawnUnderShip(elementTemplates.bomb));
        fall(spawnedBombs, elementTemplates.bomb.speed);
      },
      infinite: true,
    },
  ];
  shipInventoryIndex = 0;
  shipActiveItem = shipInventory[shipInventoryIndex];
  updateAmmoInStatusBar();
};
resetInventory();
export {useActiveItem, shipInventory, addItemToInventory, switchToNextItem, resetInventory, updateAmmoInStatusBar};

import spawnUnderShip from './spawnUnderShip.js';
import {bombTemplate, addToDB, spawnedBombs} from './elementsTemplates.js';
import fall from './InventoryElementsSpecialActions/bombFall.js';
const switchToNextItem = () => {
  shipInventoryIndex++;
  if (shipInventoryIndex > shipInventory.length - 1) {
    shipInventoryIndex = 0;
  }
  shipActiveItem = shipInventory[shipInventoryIndex];
  return shipActiveItem;
};

const addItemToInventory = (item) => {
  shipInventory.push(item);
};

const removeActiveItem = () => {
  shipInventory.splice(shipInventoryIndex, 1);
  switchToNextItem();
  useActiveItem();
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
};
let shipInventory = [];
let shipInventoryIndex = 0;
let shipActiveItem = shipInventory[shipInventoryIndex];
const resetInventory = () => {
  shipInventory = [
    {
      name: 'bomb',
      count: 3,
      action: () => {
        addToDB(spawnUnderShip(bombTemplate));
        fall(spawnedBombs, 0.5);
      },
      infinite: true,
    },
  ];
  shipInventoryIndex = 0;
  shipActiveItem = shipInventory[shipInventoryIndex];
};
resetInventory();

export {useActiveItem, shipInventory, addItemToInventory, switchToNextItem};

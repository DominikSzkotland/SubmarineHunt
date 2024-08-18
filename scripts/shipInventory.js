import spawnUnderShip from './spawnUnderShip.js';
import {bombTemplate, spawnedBombs} from './elementsTemplates.js';
import fall from './InventoryElementsSpecialActions/bombFall.js';
const switchToNextItem = () => {
  shipInventoryIndex++;
  if (shipInventoryIndex > shipInventoryKeys.length - 1) {
    shipInventoryIndex = 0;
  }
  shipActiveItem = getInventoryItem(shipInventoryIndex);
  return shipActiveItem;
};

const addItemToInventory = (item) => {
  shipInventory.push(item);
};

const removeActiveItem = () => {
  shipInventory = shipInventory.slice(shipInventoryIndex, 1);
  shipInventoryIndex--;
  if (shipInventoryIndex < 0) {
    shipInventoryIndex = shipInventory.length - 1;
  }
  shipActiveItem = shipInventory[shipInventoryIndex];
  return shipActiveItem;
};

const useActiveItem = () => {
  if (shipActiveItem.count <= 0 && shipActiveItem.name !== 'bomb') {
    removeActiveItem();
  } else if (shipActiveItem.count <= 0 && shipActiveItem.name === 'bomb') {
    return;
  } else {
    shipActiveItem.action();
    shipActiveItem.count--;
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
        spawnedBombs.push(spawnUnderShip(bombTemplate));
        fall(spawnedBombs, 0.5);
      },
    },
  ];
  shipInventoryIndex = 0;
  shipActiveItem = shipInventory[shipInventoryIndex];
};
resetInventory();

export {useActiveItem, shipInventory};

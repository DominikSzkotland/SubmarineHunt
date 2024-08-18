import spawnUnderShip from './spawnUnderShip.js';
import {bombTemplate, spawnedBombs} from './elementsTemplates.js';
function getInventoryItem(index) {
  return shipInventory[shipInventoryKeys[index]];
}

const switchToNextItem = () => {
  shipInventoryIndex++;
  if (shipInventoryIndex > shipInventoryKeys.length - 1) {
    shipInventoryIndex = 0;
  }
  shipActiveItem = shipInventoryKeys[shipInventoryIndex];
  return shipActiveItem;
};

const addItemToInventory = (item) => {
  shipInventory.push(item);
};

const removeActiveItem = () => {
  const {shipActiveItem, ...rest} = shipInventory;
  shipInventory = rest;
  shipInventoryIndex--;
  if (shipInventoryIndex < 0) {
    shipInventoryIndex = shipInventoryKeys.length - 1;
  }
  shipActiveItem = getInventoryItem(shipInventoryIndex);
  return shipActiveItem;
};

const useActiveItem = () => {
  shipActiveItem.count--;
  shipActiveItem.action();
  if (shipActiveItem <= 0 && shipActiveItem !== 'bomb') {
    removeItemFromInventory();
  }
};

const resetInventory = () => {
  shipInventory = {
    bomb: {
      count: 3,
      action: () => {
        spawnUnderShip(bombTemplate);
      },
    },
  };
  shipInventoryIndex = 0;
  shipActiveItem = getInventoryItem(shipInventoryIndex);
};
let shipInventory = {
  bomb: {
    count: 3,
    action: () => {
      spawnedBombs.push(spawnUnderShip(bombTemplate));
    },
  },
};
let shipInventoryIndex = 0;
const shipInventoryKeys = Object.keys(shipInventory);
let shipActiveItem = getInventoryItem(shipInventoryIndex);

export {switchToNextItem, addItemToInventory, removeActiveItem, useActiveItem, resetInventory};

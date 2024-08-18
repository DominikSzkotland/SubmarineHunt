import {switchToNextItem, addItemToInventory, removeActiveItem, useActiveItem, resetInventory} from './shipInventory.js';

const performShipAction = () => {
  useActiveItem();
};

export default performShipAction;

const gameWorld = document.getElementById('gameWorld');
const check = () => {
  if (window.innerWidth < window.innerHeight) {
    if (gameWorld.clientWidth / gameWorld.clientHeight < 6 / 9) {
      fixVertically(false);
      return false;
    } else {
      fixVertically(true);
    }
  } else if (window.innerWidth > window.innerHeight) {
    if (gameWorld.clientHeight / gameWorld.clientWidth < 5 / 9) {
      fixHorizontally(false);
      return false;
    } else {
      fixHorizontally(true);
    }
  } else {
    gameWorld.style.height = '100%';
    gameWorld.style.width = '100%';
  }
  return true;
};

const fixVertically = (returnTodefaults) => {
  if (returnTodefaults) {
    while (gameWorld.clientWidth / gameWorld.clientHeight > 6 / 9) {
      if (gameWorld.clientHeight >= window.innerHeight) {
        gameWorld.style.height = '100%';
        gameWorld.style.width = '100%';
        break;
      }
      gameWorld.style.height = `calc(${gameWorld.clientHeight}px + 1px)`;
    }
  } else {
    gameWorld.style.height = `calc(${gameWorld.clientHeight}px - 1px)`;
    check();
  }
};
const fixHorizontally = (returnTodefaults) => {
  if (returnTodefaults) {
    while (gameWorld.clientHeight / gameWorld.clientWidth > 5 / 9) {
      if (gameWorld.clientWidth >= window.innerWidth) {
        gameWorld.style.height = '100%';
        gameWorld.style.width = '100%';
        break;
      }
      gameWorld.style.width = `calc(${gameWorld.clientWidth}px + 1px)`;
    }
  } else {
    gameWorld.style.width = `calc(${gameWorld.clientWidth}px - 1px)`;
    check();
  }
};

export {check};

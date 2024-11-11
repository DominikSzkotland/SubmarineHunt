const isActive = () => {
  if (!document.fullscreenElement) {
    return false;
  } else {
    return true;
  }
};

const requestFullscreen = () => {
  const element = document.documentElement;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else {
    console.warn('Full-screen mode is not supported in this browser.');
  }
};

const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else {
    console.warn('Exiting full-screen mode is not supported in this browser.');
  }
};
const matchFullscreenIconsToState = () => {
  const elementsToChange = [document.getElementById('fullscreenButton')];
  elementsToChange.forEach((element) => {
    if (isActive()) {
      element.classList.remove('isNotFullscreen');
      element.classList.add('isFullscreen');
    } else {
      element.classList.remove('isFullscreen');
      element.classList.add('isNotFullscreen');
    }
  });
};
const toggle = () => {
  try {
    if (!isActive()) {
      requestFullscreen();
    } else {
      exitFullscreen();
    }
  } catch (error) {
    console.error('Fullscreen toggle failed:', error);
  }
};

export {toggle, matchFullscreenIconsToState, isActive};

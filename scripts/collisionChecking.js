const checkCollision = (element1, element2) => {
  const element1Rect = element1.getBoundingClientRect();
  const element2Rect = element2.getBoundingClientRect();
  if (!element1Rect || !element2Rect) {
    console.error('You are trying to check collision with an undefined element!');
    return -1;
  }
  if (
    element1Rect.y < element2Rect.y + element2Rect.height &&
    element1Rect.y + element1Rect.height > element2Rect.y &&
    element1Rect.x < element2Rect.x + element2Rect.width &&
    element1Rect.x + element1Rect.width > element2Rect.x
  ) {
    return true;
  } else {
    return false;
  }
};

export default checkCollision;

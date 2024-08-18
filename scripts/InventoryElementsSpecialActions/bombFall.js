const ocean = document.getElementById('ocean');
const fall = (elements, speed) => {
  elements.forEach((element) => {
    if (element.getAttribute('data-moving') === 'true') {
      return;
    }
    element.setAttribute('data-moving', 'true');
    requestAnimationFrame(() => {
      moving(element, speed);
    });
  });
};
const moving = (element, speed) => {
  element.style.top = `${parseFloat(element.style.top) + speed}%`;
  console.log(element.style.top);
  if (element.offsetTop < ocean.offsetHeight) {
    requestAnimationFrame(() => moving(element, speed));
  } else {
    element.remove();
  }
};
export default fall;

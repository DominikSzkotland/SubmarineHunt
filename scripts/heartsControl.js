import {endRound} from './main.js';
let health = 3;
const heart = '&#9829;';
const currentHealth = () => {
  return health;
};
const resetHearts = () => {
  health = 3;
  document.getElementById('lives').innerHTML = 'Lives: &#9829;&#9829;&#9829;';
};
const loseHeart = () => {
  document.getElementById('lives').innerHTML = `Lives: ${heart.repeat(--health)}`;
  if (currentHealth() <= 0) {
    endRound();
  }
};
const winHeart = () => {
  document.getElementById('lives').innerHTML = `Lives: ${heart.repeat(health++)}`;
};
export {currentHealth, resetHearts, loseHeart, winHeart};

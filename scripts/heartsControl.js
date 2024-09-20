import {endRound} from './main.js';
let maxHealth = 3;
let health = 3;
const invisibleHeart = '<span class="heart" style="visibility: hidden">&#9829;</span>';
const heart = '<span class="heart">&#9829;</span>';
const currentHealth = () => {
  return health;
};
const resetHearts = () => {
  health = 3;
  document.getElementById('lives').innerHTML = `Lives: ${heart.repeat(health)}${invisibleHeart.repeat(maxHealth - health)}`;
};
const loseHeart = () => {
  document.getElementById('lives').innerHTML = `Lives: ${heart.repeat(--health)}${invisibleHeart.repeat(maxHealth - health)}`;
  if (currentHealth() <= 0) {
    endRound();
  }
};
const winHeart = () => {
  document.getElementById('lives').innerHTML = `Lives: ${heart.repeat(health++)}${invisibleHeart.repeat(maxHealth - health)}`;
};
export {currentHealth, resetHearts, loseHeart, winHeart};

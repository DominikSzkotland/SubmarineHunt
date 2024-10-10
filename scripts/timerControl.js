let time = 0;
let minutes = 0;
let seconds = 0;
let intervalID = null;
let intervalElapsedTime = null;
let intervalStartTime = null;
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

const updateTime = () => {
  time += 1000;
  minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  seconds = Math.floor((time % (1000 * 60)) / 1000);
};

const updateClock = () => {
  if (minutes < 10) {
    minutesElement.innerHTML = '0' + minutes;
  } else {
    minutesElement.innerHTML = minutes;
  }
  if (seconds < 10) {
    secondsElement.innerHTML = '0' + seconds;
  } else {
    secondsElement.innerHTML = seconds;
  }
};
const reset = () => {
  time = 0;
  minutes = 0;
  seconds = 0;
  intervalID = null;
  intervalElapsedTime = null;
  intervalStartTime = null;
  updateClock();
};

const start = (timeToFirstRun = null) => {
  if (timeToFirstRun !== null) {
    setTimeout(() => {
      updateTime();
      updateClock();
      intervalID = setInterval(() => {
        intervalStartTime = Date.now();
        updateTime();
        updateClock();
      }, 1000);
    }, timeToFirstRun);
  } else {
    intervalID = setInterval(() => {
      intervalStartTime = Date.now();
      updateTime();
      updateClock();
    }, 1000);
  }

  return intervalID;
};

const pause = () => {
  if (intervalID === null) {
    return;
  }
  clearInterval(intervalID);
  intervalID = null;
  const intervalEndTime = Date.now();
  intervalElapsedTime = intervalEndTime - intervalStartTime;
  intervalStartTime = null;
};

export {start, pause, reset, intervalElapsedTime};

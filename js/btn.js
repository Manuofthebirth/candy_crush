const startBtn = document.querySelector('.start-btn');
const timerDisplay = document.getElementById('timer');

// countdown
let timeLeft = 180;

function countDown() {
  if (timeLeft <= 0) {
    clearInterval(timeLeft = 0)
    timerDisplay.innerHTML = 'Game Over';
  } else if (timer) {
    timeLeft -= 1;
    timerDisplay.innerHTML = new Date(timeLeft * 1000).toISOString().substr(14, 5); // converts seconds to mm:ss format
  }
}

// start/pause button
export let timer;

startBtn.addEventListener('click', () => {
  // pause if timer not null
  if(timer) {
    clearInterval(timer);
    timer = null;
    startBtn.innerHTML = 'Resume';
  } else {
    clearInterval(timer);
    timer = setInterval(countDown, 1000);
    startBtn.innerHTML = 'Pause';
  }
})

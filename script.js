let timer;
let timeLeft = 25 * 60; // 25 minutos em segundos
let isRunning = false;
let isBreak = false;

const timerDisplay = document.getElementById("timer");
const statusDisplay = document.getElementById("status");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent =
    `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      timeLeft--;
      updateDisplay();
      if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        if (!isBreak) {
          statusDisplay.textContent = "Hora do descanso!";
          timeLeft = 5 * 60; // 5 minutos de pausa
          isBreak = true;
          startTimer();
        } else {
          statusDisplay.textContent = "Sessão de foco";
          timeLeft = 25 * 60;
          isBreak = false;
        }
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  isBreak = false;
  timeLeft = 25 * 60;
  statusDisplay.textContent = "Sessão de foco";
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();

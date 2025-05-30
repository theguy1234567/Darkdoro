addEventListener("DOMContentLoaded", () => {
  const timerDisplay = document.getElementById("timer");
  const startTimerBtn = document.getElementById("timerbtn");
  const breakTimerBtn = document.getElementById("breakbtn");
  const breakTimerDisplay = document.getElementById("breaktimer");
  const toggleThemeBtn = document.getElementById("theme-toggle");
  const minSel = document.querySelectorAll(".timeSelector");
  const sessionCountDisplay = document.getElementById("sessioncounter");

  const timerBell = new Audio("bell.mp3");

  //timer logic
  let minutes = 0;
  let seconds = 10;
  let timer = null;
  let break_min = 5;
  let break_sec = 0;
  let b_timer = null;
  let s_count = 0;

  function renderTime() {
    let m = minutes.toString().padStart(2, "0");
    let s = seconds.toString().padStart(2, "0");
    timerDisplay.textContent = `${m}:${s}`;
  }

  function renderB_Time() {
    let b_m = break_min.toString().padStart(2, "0");
    let b_s = break_sec.toString().padStart(2, "0");
    breakTimerDisplay.textContent = `${b_m}:${b_s}`;
  }

  function startTimer() {
    if (startTimerBtn.textContent === "restart") {
      minutes = 25;
      seconds = 0;
    }

    if (b_timer) {
      clearInterval(b_timer);
      b_timer = null;
    }
    if (timer) {
      return;
    }

    timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          playBell();
          clearInterval(timer);
          timer = null;
          alert("pomodoro complete");
          startTimerBtn.textContent = "restart";
          startBreakTimer();
          return;
        }
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      renderTime();
    }, 1000);
  }

  function startBreakTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }

    if (b_timer) return;

    b_timer = setInterval(() => {
      clearInterval(timer);
      if (break_sec === 0) {
        if (break_min === 0) {
          playBell;
          clearInterval(b_timer);
          b_timer = null;
          alert("break finished");
          if (minutes === 0 && seconds === 0) {
            alert("session completed");
            s_count += 1;
            console.log(s_count);
            sessionCountDisplay.innerHTML = `Counter:${s_count}`;

            minutes = 0;
            seconds = 10;
            break_min = 0;
            break_sec = 15;
            renderB_Time();
            renderTime();
            startTimerBtn.textContent = "start";
          } else {
            startTimer();
          }

          return;
        }
        break_min--;
        break_sec = 59;
      } else {
        break_sec--;
      }
      renderB_Time();
    }, 1000);
  }
  function changeTheme() {
    const body = document.body;
    body.classList.add("fade");
    body.classList.toggle("white-mode");
    setTimeout(() => {
      body.classList.remove("fade");
    }, 500);
  }

  function playBell() {
    timerBell.play();
  }

  startTimerBtn.addEventListener("click", startTimer);
  renderTime();

  breakTimerBtn.addEventListener("click", startBreakTimer);
  renderB_Time();

  toggleThemeBtn.addEventListener("click", changeTheme);

  // logic to set min in the timer
  minSel.forEach((button) => {
    button.addEventListener("click", () => {
      const min = parseInt(button.dataset.minutes);
      console.log(min);
      minutes = min;
      seconds = 0;
      renderTime();
      console.log(`timer set to ${min}`);
    });
  });
});

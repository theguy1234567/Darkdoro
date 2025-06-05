addEventListener("DOMContentLoaded", () => {
  const timerDisplay = document.getElementById("timer");
  const startTimerBtn = document.getElementById("timerbtn");
  const breakTimerBtn = document.getElementById("breakbtn");
  const breakTimerDisplay = document.getElementById("breaktimer");
  const toggleThemeBtn = document.getElementById("theme-toggle");
  const minSel = document.querySelectorAll(".timeSelector");
  const sessionCountDisplay = document.getElementById("sessioncounter");
  const dismissbtn = document.getElementById("dissmiss");

  const timerBell = new Audio("bell.mp3");
  const timeSelector = document.getElementById("revealtimeelem");

  setTimeout(() => {
    DisplaytipsMenue();
  }, 2000);

  let minutes = 0;
  let seconds = 10;
  let timer = null;
  let break_min = 10;
  let break_sec = 0;
  let b_timer = null;
  let s_count = 0;
  //functions to render and display time on the DOM
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
  //timer logic
  function startTimer() {
    if (startTimerBtn.textContent === "start") {
      startTimerBtn.textContent = "pause";
      timer = null;
    } else if (startTimerBtn.textContent === "pause") {
      startTimerBtn.textContent = "start";
      clearInterval(timer);
    } else if (startTimerBtn.textContent === "restart") {
      startTimerBtn.textContent = "pause";
      minutes = 0;
      seconds = 10;
      break_min = 0;
      break_sec = 10;
      renderB_Time();
      renderTime();
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

          if (break_min === 0 && break_sec === 0) {
            alert("session completed");
            s_count += 1;
            console.log(s_count);
            sessionCountDisplay.innerHTML = `Counter:${s_count}`;
            minutes = 0;
            seconds = 10;
            break_min = 15;
            break_sec = 0;
            renderB_Time();
            renderTime();
            startTimerBtn.textContent = "start";
          }
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
  // break timer logic
  function startBreakTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
      startTimerBtn.textContent = "start";
    }

    if (b_timer) return;

    b_timer = setInterval(() => {
      clearInterval(timer);
      if (break_sec === 0) {
        if (break_min === 0) {
          playBell();
          clearInterval(b_timer);
          b_timer = null;
          alert("break finished");
          if (minutes === 0 && seconds === 0) {
            alert("session completed");
            s_count += 1;
            console.log(s_count);
            sessionCountDisplay.innerHTML = `${s_count}`;

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
  //func to change  theme
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
  // function to display the tips menue
  function revealCont() {
    const container = document.getElementById("timeelements");
    container.classList.toggle("show");
  }

  dismissbtn.addEventListener("click", () => {
    const menueCont = document.getElementById("tipsmen");
    menueCont.style.opacity = "0";
    // menueCont.style.display = "none";
    setTimeout(() => {
      menueCont.style.display = "none";
    }, 2000);
  });

  function DisplaytipsMenue() {
    const menueCont = document.getElementById("tipsmen");
    menueCont.style.opacity = "1";
  }

  startTimerBtn.addEventListener("click", startTimer);
  renderTime();

  breakTimerBtn.addEventListener("click", startBreakTimer);
  renderB_Time();

  toggleThemeBtn.addEventListener("click", changeTheme);

  timeSelector.addEventListener("click", revealCont);

  // logic to set min in the timer
  minSel.forEach((button) => {
    button.addEventListener("click", () => {
      const min = parseInt(button.dataset.minutes);
      console.log(min);
      minutes = min;
      seconds = 0;
      renderTime();
      console.log(`timer set to ${min}`);
      const container = document.getElementById("timeelements");
      container.classList.remove("show");
    });
  });
});

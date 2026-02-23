const modeButtons = document.querySelectorAll(".mode-btn");
const countdownConfig = document.getElementById("countdownConfig");
const minutesInput = document.getElementById("minutes");
const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");

const state = {
  mode: "stopwatch",
  running: false,
  elapsedMs: 0,
  remainingMs: 60_000,
  timerId: null,
  lastTickAt: 0
};

function parseMinutesToMs() {
  const minutes = Number(minutesInput.value);
  if (!Number.isFinite(minutes) || minutes < 0) return 0;
  return Math.floor(minutes * 60_000);
}

function formatTime(ms) {
  const safeMs = Math.max(0, ms);
  const minutes = Math.floor(safeMs / 60_000)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((safeMs % 60_000) / 1_000)
    .toString()
    .padStart(2, "0");
  const centiseconds = Math.floor((safeMs % 1_000) / 10)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}.${centiseconds}`;
}

function getCurrentMs() {
  return state.mode === "stopwatch" ? state.elapsedMs : state.remainingMs;
}

function render() {
  display.textContent = formatTime(getCurrentMs());
}

function clearTicker() {
  if (state.timerId !== null) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
  state.running = false;
}

function clearLaps() {
  lapList.innerHTML = "";
}

function tick() {
  const now = Date.now();
  const delta = now - state.lastTickAt;
  state.lastTickAt = now;

  if (state.mode === "stopwatch") {
    state.elapsedMs += delta;
    render();
    return;
  }

  state.remainingMs = Math.max(0, state.remainingMs - delta);
  render();

  if (state.remainingMs === 0) {
    clearTicker();
    alert("Time is up!");
  }
}

function start() {
  if (state.running) return;

  if (state.mode === "countdown" && state.remainingMs <= 0) {
    state.remainingMs = parseMinutesToMs();
  }

  if (state.mode === "countdown" && state.remainingMs <= 0) return;

  state.running = true;
  state.lastTickAt = Date.now();
  state.timerId = setInterval(tick, 20);
}

function pause() {
  clearTicker();
}

function reset() {
  clearTicker();

  if (state.mode === "stopwatch") {
    state.elapsedMs = 0;
  } else {
    state.remainingMs = parseMinutesToMs();
  }

  clearLaps();
  render();
}

function addLap() {
  const lap = document.createElement("li");
  lap.textContent = formatTime(getCurrentMs());
  lapList.prepend(lap);
}

function setMode(nextMode) {
  if (state.mode === nextMode) return;

  clearTicker();
  state.mode = nextMode;

  modeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === nextMode);
  });

  countdownConfig.classList.toggle("is-hidden", nextMode !== "countdown");

  if (nextMode === "stopwatch") {
    state.elapsedMs = 0;
  } else {
    state.remainingMs = parseMinutesToMs();
  }

  clearLaps();
  render();
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setMode(button.dataset.mode);
  });
});

startBtn.addEventListener("click", start);
pauseBtn.addEventListener("click", pause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", addLap);

minutesInput.addEventListener("change", () => {
  if (state.mode !== "countdown" || state.running) return;
  state.remainingMs = parseMinutesToMs();
  render();
});

render();
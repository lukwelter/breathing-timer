const mainBtn = document.getElementById("mainBtn");
const breathingCircle = document.getElementById("breathingCircle");
const leftHalf = document.getElementById("leftHalf");
const rightHalf = document.getElementById("rightHalf");

const phases = [
  { name: "Einatmen", duration: 4, className: "inhale" },
  { name: "Ausatmen", duration: 6, className: "exhale" }
];

let currentPhaseIndex = 0;
let intervalId = null;
let running = false;

function updateVisuals() {
  const currentPhase = phases[currentPhaseIndex];

  breathingCircle.classList.remove("inhale", "exhale");
  breathingCircle.classList.add(currentPhase.className);

  if (currentPhase.name === "Einatmen") {
    rightHalf.classList.remove("dimmed");
    leftHalf.classList.add("dimmed");
  } else {
    leftHalf.classList.remove("dimmed");
    rightHalf.classList.add("dimmed");
  }
}

function nextPhase() {
  currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
  updateVisuals();
}

function startTimer() {
  if (running) return;

  running = true;
  currentPhaseIndex = 0;
  mainBtn.textContent = "Reset";

  updateVisuals();

  intervalId = setInterval(() => {
    nextPhase();
  }, 4000 + 6000); // wird direkt unten ersetzt
}
function resetTimer() {
  clearInterval(intervalId);
  intervalId = null;
  running = false;

  breathingCircle.classList.remove("inhale", "exhale");
  leftHalf.classList.remove("dimmed");
  rightHalf.classList.remove("dimmed");

  mainBtn.textContent = "Start";
}

function runBreathingCycle() {
  let phaseStartTime = Date.now();

  updateVisuals();

  intervalId = setInterval(() => {
    const currentPhase = phases[currentPhaseIndex];
    const elapsed = Date.now() - phaseStartTime;

    if (elapsed >= currentPhase.duration * 1000) {
      currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
      phaseStartTime = Date.now();
      updateVisuals();
    }
  }, 100);
}

mainBtn.addEventListener("click", () => {
  if (!running) {
    running = true;
    currentPhaseIndex = 0;
    mainBtn.textContent = "Reset";
    runBreathingCycle();
  } else {
    resetTimer();
  }
});

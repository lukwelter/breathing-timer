const mainBtn = document.getElementById("mainBtn");
const phaseLabel = document.getElementById("phaseLabel");
const leftFill = document.getElementById("leftFill");
const rightFill = document.getElementById("rightFill");

const phases = [
  {
    name: "Einatmen",
    duration: 4,
    activeFill: rightFill,
    inactiveFill: leftFill
  },
  {
    name: "Ausatmen",
    duration: 6,
    activeFill: leftFill,
    inactiveFill: rightFill
  }
];

let running = false;
let currentPhaseIndex = 0;
let phaseTimeout = null;
let animationFrame = null;

function clearTimers() {
  if (phaseTimeout) {
    clearTimeout(phaseTimeout);
    phaseTimeout = null;
  }

  if (animationFrame) {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }
}

function setFillInstant(fillElement, scale) {
  fillElement.style.transition = "none";
  fillElement.style.transform = `scaleX(${scale})`;

  // Reflow, damit der Browser den Zustand sicher übernimmt
  void fillElement.offsetWidth;
}

function resetVisualState() {
  clearTimers();

  setFillInstant(leftFill, 1);
  setFillInstant(rightFill, 1);

  phaseLabel.textContent = "";
  mainBtn.textContent = "Start";
}

function animatePhase() {
  const phase = phases[currentPhaseIndex];
  const activeFill = phase.activeFill;
  const inactiveFill = phase.inactiveFill;
  const durationMs = phase.duration * 1000;

  phaseLabel.textContent = phase.name;

  // Inaktive Hälfte voll anzeigen
  setFillInstant(inactiveFill, 1);

  // Aktive Hälfte auf voll setzen und dann weich auf fast 0 schrumpfen
  setFillInstant(activeFill, 1);
  activeFill.style.transition = `transform ${durationMs}ms linear`;

  requestAnimationFrame(() => {
    activeFill.style.transform = "scaleX(0.02)";
  });

  phaseTimeout = setTimeout(() => {
    currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
    animatePhase();
  }, durationMs);
}

function startTimer() {
  if (running) return;

  running = true;
  currentPhaseIndex = 0;
  mainBtn.textContent = "Reset";
  animatePhase();
}

function resetTimer() {
  running = false;
  resetVisualState();
}

mainBtn.addEventListener("click", () => {
  if (!running) {
    startTimer();
  } else {
    resetTimer();
  }
});

resetVisualState();

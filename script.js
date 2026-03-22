const mainBtn = document.getElementById("mainBtn");
const dot = document.getElementById("dot");
const phaseLabel = document.getElementById("phaseLabel");

const DESKTOP_RADIUS = 130;
const MOBILE_RADIUS = 109;
const MOBILE_BREAKPOINT = 420;

const phases = [
  { label: "in", durationMs: 4000 },
  { label: "out", durationMs: 6000 }
];

let running = false;
let currentPhaseIndex = 0;
let phaseStartTime = null;
let animationFrameId = null;

function getRadius() {
  return window.innerWidth <= MOBILE_BREAKPOINT ? MOBILE_RADIUS : DESKTOP_RADIUS;
}

function setDotAngle(angleDeg) {
  const radius = getRadius();
  dot.style.transform = `rotate(${angleDeg}deg) translateY(-${radius}px)`;
}

function animate(timestamp) {
  if (!running) return;

  if (phaseStartTime === null) {
    phaseStartTime = timestamp;
  }

  const currentPhase = phases[currentPhaseIndex];
  const elapsed = timestamp - phaseStartTime;
  const progress = Math.min(elapsed / currentPhase.durationMs, 1);
  const angle = progress * 360;

  phaseLabel.textContent = currentPhase.label;
  setDotAngle(angle);

  if (elapsed >= currentPhase.durationMs) {
    currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
    phaseStartTime = timestamp;
    setDotAngle(0);
  }

  animationFrameId = requestAnimationFrame(animate);
}

function startTimer() {
  running = true;
  currentPhaseIndex = 0;
  phaseStartTime = null;
  phaseLabel.textContent = phases[0].label;
  mainBtn.textContent = "Reset";
  animationFrameId = requestAnimationFrame(animate);
}

function resetTimer() {
  running = false;

  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  currentPhaseIndex = 0;
  phaseStartTime = null;
  phaseLabel.textContent = "";
  setDotAngle(0);
  mainBtn.textContent = "Start";
}

mainBtn.addEventListener("click", () => {
  if (!running) {
    startTimer();
  } else {
    resetTimer();
  }
});

window.addEventListener("resize", () => {
  if (!running) {
    setDotAngle(0);
  }
});

resetTimer();

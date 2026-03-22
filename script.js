const mainBtn = document.getElementById("mainBtn");
const dot = document.getElementById("dot");
const phaseLabel = document.getElementById("phaseLabel");

const phases = [
  { name: "Ein", duration: 4 },
  { name: "Aus", duration: 6 }
];

let running = false;
let currentPhaseIndex = 0;
let phaseStartTime = null;
let animationFrameId = null;
let currentAngle = 0;

function updatePhaseLabel() {
  phaseLabel.textContent = phases[currentPhaseIndex].name;
}

function animate(timestamp) {
  if (!running) return;

  if (phaseStartTime === null) {
    phaseStartTime = timestamp;
  }

  const currentPhase = phases[currentPhaseIndex];
  const elapsed = (timestamp - phaseStartTime) / 1000;
  const progress = elapsed / currentPhase.duration;

  if (progress >= 1) {
    currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
    phaseStartTime = timestamp;
    updatePhaseLabel();
  }

  const adjustedPhase = phases[currentPhaseIndex];
  const adjustedElapsed = (timestamp - phaseStartTime) / 1000;
  const adjustedProgress = Math.min(adjustedElapsed / adjustedPhase.duration, 1);

  const startAngle = currentAngle;
  const angleSpan = 180;
  const newAngle = startAngle + adjustedProgress * angleSpan;

  dot.style.transform = `rotate(${newAngle}deg) translateY(-146px)`;

  if (adjustedProgress >= 1) {
    currentAngle = startAngle + angleSpan;
  }

  animationFrameId = requestAnimationFrame(animate);
}

function startTimer() {
  running = true;
  currentPhaseIndex = 0;
  currentAngle = 0;
  phaseStartTime = null;
  updatePhaseLabel();
  mainBtn.textContent = "Reset";
  animationFrameId = requestAnimationFrame(animate);
}

function resetTimer() {
  running = false;

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }

  phaseStartTime = null;
  currentAngle = 0;
  dot.style.transform = "rotate(0deg) translateY(-146px)";
  phaseLabel.textContent = "";
  mainBtn.textContent = "Start";
}

mainBtn.addEventListener("click", () => {
  if (!running) {
    startTimer();
  } else {
    resetTimer();
  }
});

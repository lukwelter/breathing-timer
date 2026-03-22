const mainBtn = document.getElementById("mainBtn");
const dot = document.getElementById("dot");
const phaseLabel = document.getElementById("phaseLabel");

const phases = [
  { name: "Ein", duration: 4 },
  { name: "Aus", duration: 6 }
];

let running = false;
let currentPhaseIndex = 0;
let startTime = null;
let animationFrame = null;

function animate(timestamp) {
  if (!startTime) startTime = timestamp;

  const phase = phases[currentPhaseIndex];
  const elapsed = (timestamp - startTime) / 1000;
  const progress = elapsed / phase.duration;

  if (progress >= 1) {
    currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
    startTime = timestamp;
    updatePhase();
  }

  const angle = (progress % 1) * 360;

  dot.style.transform =
    `translate(-50%, -50%) rotate(${angle}deg) translate(140px)`;

  animationFrame = requestAnimationFrame(animate);
}

function updatePhase() {
  const phase = phases[currentPhaseIndex];
  phaseLabel.textContent = phase.name;
}

function start() {
  running = true;
  currentPhaseIndex = 0;
  startTime = null;
  updatePhase();
  mainBtn.textContent = "Reset";

  animationFrame = requestAnimationFrame(animate);
}

function reset() {
  running = false;
  cancelAnimationFrame(animationFrame);

  dot.style.transform =
    "translate(-50%, -50%) rotate(0deg) translate(140px)";

  phaseLabel.textContent = "";
  mainBtn.textContent = "Start";
}

mainBtn.addEventListener("click", () => {
  if (!running) {
    start();
  } else {
    reset();
  }
});

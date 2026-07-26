const $ = (id) => document.getElementById(id);

const app = $("app");
const form = $("calcForm");
const segmented = document.querySelector(".segmented");
const modeButtons = document.querySelectorAll(".segmented__btn");
const totalInput = $("totalInput");
const countInput = $("countInput");
const countLabel = $("countLabel");
const errorMsg = $("errorMsg");
const percentText = $("percentText");
const progressBar = $("progressBar");
const progressFill = $("progressFill");
const heroCaption = $("heroCaption");
const cardBadge = $("cardBadge");
const cardText = $("cardText");
const eggText = $("eggText");
const memeArea = $("memeArea");
const memeImage = $("memeImage");

const TARGET = 75;
const SAFE_AT = 78;
const GGW_AT = 15;
const NERD_MIN_PERCENT = 90;
const NERD_MIN_SKIPPABLE = 8;

const MODES = {
  attended: { label: "Classes Attended", placeholder: "Number of classes attended" },
  missed: { label: "Classes Missed", placeholder: "Number of classes missed" }
};

const BADGES = { safe: "Safe Area", warn: "Borderline", crit: "Critical" };

const EASTER_EGGS = {
  ggw: { src: "./image/dawg.webp", text: "GGW" },
  nerd: { src: "./image/nerd.webp", text: "Classroom Furniture" }
};

let mode = "attended";
let hasResult = false;
let currentEgg = null;

const classWord = (count) => (count === 1 ? "class" : "classes");

function stateFor(percentage) {
  if (percentage >= SAFE_AT) return "safe";
  if (percentage >= TARGET) return "warn";
  return "crit";
}

function parseField(input) {
  const raw = input.value.trim();
  if (raw === "") return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

function setMode(next) {
  mode = next;
  segmented.dataset.mode = next;
  countLabel.textContent = MODES[next].label;
  countInput.placeholder = MODES[next].placeholder;

  modeButtons.forEach((btn) => {
    const active = btn.dataset.mode === next;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-pressed", String(active));
  });

  markStale();
}

// Displayed numbers belong to the last calculation — dim them until recalculated.
function markStale() {
  errorMsg.hidden = true;
  if (!hasResult) return;
  app.classList.add("is-stale");
  heroCaption.textContent = "Press Calculate to update";
}

// egg is null to hide, or one of EASTER_EGGS to show.
function setMeme(egg) {
  const changed = egg !== currentEgg;
  currentEgg = egg;

  eggText.hidden = !egg;
  memeArea.hidden = !egg;
  if (!egg) return;

  eggText.textContent = egg.text;
  if (!changed) return;

  memeImage.src = egg.src;
  // Forcing a reflow replays the fade-in whenever the egg newly appears or switches.
  memeImage.style.animation = "none";
  void memeImage.offsetWidth;
  memeImage.style.animation = "";
}

function reset(caption, error) {
  hasResult = false;
  app.classList.remove("is-stale");
  app.dataset.state = "neutral";
  percentText.textContent = "---";
  progressFill.style.width = "0%";
  progressBar.setAttribute("aria-valuenow", "0");
  heroCaption.textContent = caption;
  cardBadge.textContent = BADGES.safe;
  cardText.textContent = "Your attendance summary will appear here.";
  setMeme(null);

  errorMsg.textContent = error ?? "";
  errorMsg.hidden = !error;
}

function validate(total, count) {
  if (total === null || count === null) {
    return { caption: "Enter your numbers to begin", error: "Please fill in both fields." };
  }
  if (total < 0 || count < 0) {
    return { caption: "Waiting for valid input", error: "Values cannot be negative." };
  }
  if (total === 0) {
    return { caption: "No classes recorded yet" };
  }
  if (count > total) {
    return {
      caption: "Waiting for valid input",
      error: `Classes ${mode} cannot exceed total classes.`
    };
  }
  return null;
}

function calculate() {
  const total = parseField(totalInput);
  const count = parseField(countInput);

  const problem = validate(total, count);
  if (problem) {
    reset(problem.caption, problem.error);
    return;
  }

  const attended = mode === "missed" ? total - count : count;
  const percentage = Number(((attended / total) * 100).toFixed(2));
  const state = stateFor(percentage);

  hasResult = true;
  errorMsg.hidden = true;
  app.classList.remove("is-stale");
  app.dataset.state = state;
  percentText.textContent = `${percentage}%`;
  progressFill.style.width = `${Math.min(percentage, 100)}%`;
  progressBar.setAttribute("aria-valuenow", String(percentage));
  heroCaption.textContent = `${attended} attended out of ${total} · target ${TARGET}%`;
  cardBadge.textContent = BADGES[state];

  if (percentage >= TARGET) {
    // Largest n where attended / (total + n) still clears the target
    const skippable = Math.floor((4 * attended - 3 * total) / 3);

    cardText.innerHTML =
      skippable <= 0
        ? "You are on the edge! You cannot miss any more classes."
        : `You can safely miss <strong>${skippable}</strong> more ${classWord(skippable)} and stay above ${TARGET}%.`;

    const isOverachiever = percentage > NERD_MIN_PERCENT && skippable > NERD_MIN_SKIPPABLE;
    setMeme(isOverachiever ? EASTER_EGGS.nerd : null);
    return;
  }

  // Smallest n where (attended + n) / (total + n) reaches the target
  const needed = Math.ceil(3 * total - 4 * attended);

  cardText.innerHTML = `You need to attend <strong>${needed}</strong> consecutive ${classWord(needed)} to reach ${TARGET}%.`;
  setMeme(needed > GGW_AT ? EASTER_EGGS.ggw : null);
}

modeButtons.forEach((btn) => {
  btn.addEventListener("click", () => setMode(btn.dataset.mode));
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  calculate();
});

totalInput.addEventListener("input", markStale);
countInput.addEventListener("input", markStale);

setMode(mode);

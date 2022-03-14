// * Variables
const viewport = document.querySelector('meta[name=viewport]');
const overlayEl = document.querySelector('.overlay');
const rulesBtn = document.querySelector('#rules');
const closeModalBtn = document.querySelector('#close-modal');
const paperBtn = document.querySelector('#paper');
const gameEl = document.querySelector('#game');
const resultsEl = document.querySelector('#results');
const pickBtns = document.querySelectorAll('#game button');
const resultsOutcomeEls = document.querySelectorAll('#results div');

const picks = [
  {
    name: 'paper',
    beats: 'rock',
  },
  {
    name: 'scissors',
    beats: 'paper',
  },
  {
    name: 'rock',
    beats: 'scissors',
  },
];

// * Methods
function pageLoad() {
  document.body.classList.remove('preload');
  viewport.setAttribute('content', viewport.content + ', height=' + window.innerHeight);
}

function showModal() {
  overlayEl.classList.add('visible');
}

function closeModal() {
  overlayEl.classList.remove('visible');
}

function handleUserPick() {
  const pickName = this.dataset.pick;
  const userPick = picks.find((pick) => pick.name === pickName);
  compare(userPick);
}

function handleAIPick() {
  return picks[Math.trunc(Math.random() * picks.length)];
}

function compare(userPick) {
  const aiPick = handleAIPick();
  displayResultsUI([userPick, aiPick]);
}

function displayResultsUI(results) {
  console.log(results);
}

// * Events
window.addEventListener('load', pageLoad);
window.addEventListener('keydown', (e) => {
  if (overlayEl.classList.contains('visible') && e.key === 'Escape') {
    closeModal();
  }
});
rulesBtn.addEventListener('click', showModal);
closeModalBtn.addEventListener('click', closeModal);
pickBtns.forEach((pickBtn) => {
  pickBtn.addEventListener('click', handleUserPick);
});

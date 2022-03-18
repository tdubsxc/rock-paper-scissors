// * Variables
const viewport = document.querySelector('meta[name=viewport]');
const overlayEl = document.querySelector('.overlay');
const rulesBtn = document.querySelector('#rules');
const closeModalBtn = document.querySelector('#close-modal');
const gameEl = document.querySelector('.game');
const pickBtns = document.querySelectorAll('.game button');
const resultsEl = document.querySelector('.results');
const resultsEls = document.querySelectorAll('.results__result');
const resultsMsgEl = document.querySelector('#results__msg');
const resultsStatusEl = document.querySelector('.results__status');
const playAgainBtn = document.querySelector('#play-again');
const scoreEl = document.querySelector('#score');

let score = 0;

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
  overlayEl.classList.add('overlay--visible');
}

function closeModal() {
  overlayEl.classList.remove('overlay--visible');
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
  showResultsUI([userPick, aiPick]);
  showWinnerUI([userPick, aiPick]);
}

function showResultsUI(results) {
  resultsEls.forEach((resultEl, i) => {
    setTimeout(() => {
      resultEl.innerHTML = `
        <div class="hand hand--bigger ${results[i].name}">
          <div class="hand-inner">
            <img src="/icon-${results[i].name}.svg" alt="${results[i].name}" />
          </div>
        </div>
    `;
    }, i * 500);
  });

  gameEl.classList.toggle('game--hidden');
  resultsEl.classList.toggle('results--hidden');
}

function showWinnerUI(results) {
  setTimeout(() => {
    const userWins = determineWinner(results);
    const aiWins = determineWinner(results.reverse());

    if (userWins) {
      resultsMsgEl.innerHTML = 'YOU WIN';
      resultsEls[0].classList.add('results__result--winner');
      updateScore(1);
    } else if (aiWins) {
      resultsMsgEl.innerHTML = 'YOU LOSE';
      resultsEls[1].classList.add('results__result--winner');
      updateScore(-1);
    } else {
      resultsMsgEl.innerHTML = 'DRAW';
    }

    resultsEl.classList.toggle('results--final');
    resultsStatusEl.classList.toggle('results__status--hidden');
  }, 500);
}

function determineWinner(results) {
  return results[0].beats === results[1].name;
}

function updateScore(n) {
  score += n;
  scoreEl.innerHTML = score;
}

function playAgain() {
  gameEl.classList.toggle('game--hidden');
  resultsEl.classList.toggle('results--hidden');

  resultsEl.classList.toggle('results--final');
  resultsStatusEl.classList.toggle('results__status--hidden');
  resultsEls.forEach((resultEl) => {
    resultEl.innerHTML = '';
    if (resultEl.classList.contains('results__result--winner')) {
      resultEl.classList.remove('results__result--winner');
    }
  });
}

// * Events
window.addEventListener('load', pageLoad);
window.addEventListener('keydown', (e) => {
  overlayEl.classList.contains('overlay--visible') && e.key === 'Escape' && closeModal();
});
overlayEl.addEventListener('click', (e) => {
  e.target.classList.contains('overlay--visible') && closeModal();
});
closeModalBtn.addEventListener('click', closeModal);
rulesBtn.addEventListener('click', showModal);
pickBtns.forEach((pickBtn) => {
  pickBtn.addEventListener('click', handleUserPick);
});
playAgainBtn.addEventListener('click', playAgain);

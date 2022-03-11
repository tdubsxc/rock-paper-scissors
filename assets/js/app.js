// * Variables
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const rulesBtn = document.querySelector('#rules');
const closeModalBtn = document.querySelector('#close-modal');

// * Methods
function pageLoad(_e) {
  document.body.classList.remove('preload');
  document
    .querySelector('meta[name=viewport]')
    .setAttribute('content', this.viewport.content + ', height=' + window.innerHeight);
}

function showModal(e) {
  overlay.classList.add('visible');
}

function closeModal(e) {
  overlay.classList.remove('visible');
}

// * Events
window.addEventListener('DOMContentLoaded', pageLoad);
window.addEventListener('keydown', (e) => overlay.classList.contains('visible') && e.key === 'Escape' && closeModal());
rulesBtn.addEventListener('click', showModal);
closeModalBtn.addEventListener('click', closeModal);

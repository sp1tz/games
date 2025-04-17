'use strict';

(() => {
  let diffHandler,
      multiPlay,
      soloPlay;

  function changeVisibilty() {
    diffHandler.style.visibility = multiPlay.checked ? 'hidden' : 'visible';
  }

  window.addEventListener('load', () => {
    diffHandler = document.getElementById('difficultySection');
    multiPlay = document.getElementById('2player');
    soloPlay = document.getElementById('1player');

    changeVisibilty();

    multiPlay.addEventListener('click', changeVisibilty);
    soloPlay.addEventListener('click', changeVisibilty);
  });
})();

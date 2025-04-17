'use strict';

(() => {
  const dice = new Array(2),
        intervals = [],
        pics = new Array(6),
        values = new Array(2);

  let counter,
      point,
      results,
      rollNumber;

  function init() {
    point = 0;
    rollNumber = 0;

    results.innerHTML = '';
    dice[0].style.backgroundImage = 'none';
    dice[1].style.backgroundImage = 'none';

    document.addEventListener('keyup', roll);
  }

  function roll(event) {
    if (event.keyCode === 32) {
      counter = 0;
      rollNumber++;

      document.removeEventListener('keyup', roll);

      values[0] = Math.floor(Math.random() * 6);
      spin(values[0], 0);
      values[1] = Math.floor(Math.random() * 6);
      spin(values[1], 1);

      window.setTimeout(rules, 2000);
    }
  }

  function spin(picNumber, diceNumber) {
    intervals.push(window.setInterval(() => {
      dice[diceNumber].style.backgroundImage = pics[counter % 6];
      counter++;

      if (counter > 24) {
        window.clearInterval(intervals.shift(diceNumber));
        dice[diceNumber].style.backgroundImage = pics[picNumber];
      }
    }, 100));
  }

  function rules() {
    const total = values[0] + values[1] + 2;

    let gameOver;

    if (rollNumber === 1 && (total === 7 || total === 11)) {
      results.innerHTML = `You rolled a ${values[0] + 1} & ${values[1] + 1}; you win!`;
      gameOver = true;
    } else if (rollNumber === 1 && (total === 2 || total === 3 || total === 12)) {
      results.innerHTML = `You rolled a ${values[0] + 1} & ${values[1] + 1}; sorry you lose.`;
      gameOver = true;
    } else if (rollNumber === 1) {
      point = total;
      results.innerHTML = `You rolled a ${point}; this is your point.`;
    } else if (rollNumber > 1 && total === 7) {
      results.innerHTML += `<br>You rolled a 7 on roll number ${rollNumber}; sorry you lose.`;
      gameOver = true;
    } else if (rollNumber > 1 && total === point) {
      results.innerHTML += `<br>You rolled your point on roll number ${rollNumber}; you win!`;
      gameOver = true;
    } else {
      results.innerHTML +=
        `<br>On roll number ${rollNumber} you rolled a ${values[0] + 1} & ${values[1] + 1}.`;
    }

    if (gameOver) {
      document.removeEventListener('keyup', roll);

      if (window.confirm('Play again?')) {
        init();
      }
    } else if (!intervals.length) {
      document.addEventListener('keyup', roll);
    }
  }

  window.addEventListener('load', () => {
    results = document.getElementById('results');

    dice[0] = document.getElementById('die1');
    dice[1] = document.getElementById('die2');

    for (let i = 0; i < pics.length; i++) {
      pics[i] = `url('pics/${i + 1}.png')`;
    }

    init();
  });
})();

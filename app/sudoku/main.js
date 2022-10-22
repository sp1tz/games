'use strict';

function Spot(element) {
  if (element.innerText === '-') {
    element.addEventListener('click', window.UI.fillSquare);
    element.className += ' entry';
    this.element = element;
  } else {
    this.element = null;
  }

  this.value = element.innerText;
  this.location = element.id;
  this.boxNumber = 3 * Math.floor(this.location[0] / 3) + Math.floor(this.location[1] / 3);
}

Spot.prototype.setValue = function(value) {
  if (this.element) {
    this.element.innerText = value;
    this.value = value;
  }
};

Spot.prototype.toString = function() {
  return `${this.value}${this.element ? '*' : ' '}`;
};

window.addEventListener('load', () => {
  window.UI.statusElements = new Array(4);
  window.UI.statusElements[0] = document.getElementById('valid');
  window.UI.statusElements[1] = document.getElementById('invalid');
  window.UI.statusElements[2] = document.getElementById('complete');
  window.UI.statusElements[3] = document.getElementById('incomplete');

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      window.board.setSpot(new Spot(document.getElementById(`${i}${j}`)));
    }
  }

  window.UI.solveBtn = document.getElementsByTagName('button')[0];
  window.UI.solveBtn.addEventListener('click', window.UI.solveBtnCb);
  window.UI.setStatus(window.board.check());
});

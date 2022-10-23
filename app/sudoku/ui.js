'use strict';

window.UI = {
  checkSpot: (valueToFill) => {
    return valueToFill !== null &&
           Number.isNaN(Number.parseInt(valueToFill, 10)) &&
           valueToFill !== '-' ||
           Number.parseInt(valueToFill, 10) < 1 ||
           Number.parseInt(valueToFill, 10) > 9 ||
           valueToFill !== null &&
           valueToFill.length > 1;
  },
  disable: function() {
    this.solveBtn.removeEventListener('click', this.solveBtnCb);
    document.addEventListener('click', (e) => { e.stopPropagation(); }, true);
  },
  setStatus: function(trueSpotsWithNoFalse) { // 27 checks @ 9 a clip
    this.statusElements[0].className = trueSpotsWithNoFalse ? '' : 'hide';
    this.statusElements[1].className = trueSpotsWithNoFalse ? 'hide' : '';
    this.statusElements[2].className = trueSpotsWithNoFalse === 243 ? '' : 'hide';
    this.statusElements[3].className = trueSpotsWithNoFalse === 243 ? 'hide' : '';

    if (trueSpotsWithNoFalse === 243) {
      this.disable();
    }
  },
  fillSquare: function() { // this is HTML element, not UI object
    let valueToFill;

    do {
      valueToFill = window.prompt(
        `Enter value for row ${Number(this.id[0]) + 1}, column ${Number(this.id[1]) + 1}:`
      );
    } while (window.UI.checkSpot(valueToFill));

    if (valueToFill) {
      window.board.getSpot(this.id).setValue(valueToFill);
      window.UI.setStatus(window.board.check());
    }
  },
  solveBtnCb: () => {
    if (window.confirm('Give up? Have the computer solve the puzzle.')) {
      window.UI.disable();
      window.solveAI(window.UI.setStatus.bind(window.UI));
    }
  }
};

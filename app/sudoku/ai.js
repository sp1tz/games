'use strict';
window.solveAI = (function() {
  const workingSet = [];

  function discover() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const spot = window.board.getSpot(`${i}${j}`);

        if (spot.element) {
          spot.setValue('-');
          workingSet.push(spot);
        }
      }
    }
  }

  function complete() {
    if (!workingSet.length) {
      return true;
    } else {
      const spot = workingSet.pop();
      let res = false;

      for (let i = 1; !res && i < 10; i++) {
        spot.setValue(String(i));

        if (window.board.check()) {
          res = complete();
        }
      }

      if (!res) {
        spot.setValue('-');
        workingSet.push(spot);
      }

      return res;
    }
  }

  return function(setStatus) {
    discover();
    complete();
    setStatus(this.board.check());
  };
}());

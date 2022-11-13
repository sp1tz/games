'use strict';

window.nextMoveAI = (function() {
  const notFound = -1;

  function setReset(board) {
    for (let i = 0; i < 9; i++) {
      board[i] = window.theGameBoard[i];
    }
  }

  function emptySide() {
    let toReturn = -1;

    if (window.availableMoves.indexOf(1) !== notFound) {
      toReturn = 1;
    }
    if (window.availableMoves.indexOf(3) !== notFound) {
      toReturn = 3;
    }
    if (window.availableMoves.indexOf(5) !== notFound) {
      toReturn = 5;
    }
    if (window.availableMoves.indexOf(7) !== notFound) {
      toReturn = 7;
    }

    return toReturn;
  }

  function emptyCorner() {
    let toReturn = -1;

    if (window.availableMoves.indexOf(0) !== notFound) {
      toReturn = 0;
    }
    if (window.availableMoves.indexOf(2) !== notFound) {
      toReturn = 2;
    }
    if (window.availableMoves.indexOf(6) !== notFound) {
      toReturn = 6;
    }
    if (window.availableMoves.indexOf(8) !== notFound) {
      toReturn = 8;
    }

    return toReturn < 0 ? emptySide() : toReturn;
  }

  function oppositeCorner() {
    const opponent = window.turn % 2 ? 1 : -1;

    let toReturn = -1;

    if (window.availableMoves.indexOf(0) !== notFound && window.theGameBoard[8] === opponent) {
      toReturn = 0;
    }
    if (window.availableMoves.indexOf(2) !== notFound && window.theGameBoard[6] === opponent) {
      toReturn = 2;
    }
    if (window.availableMoves.indexOf(6) !== notFound && window.theGameBoard[2] === opponent) {
      toReturn = 6;
    }
    if (window.availableMoves.indexOf(8) !== notFound && window.theGameBoard[0] === opponent) {
      toReturn = 8;
    }

    return toReturn < 0 ? emptyCorner() : toReturn;
  }

  function center() {
    return window.availableMoves.indexOf(4) !== notFound ? 4 : oppositeCorner();
  }

  function blockFork() {
    const opponent = window.turn % 2 ? 1 : -1,
          tempBoard = new Array(9);

    let sumTriosReturned,
        toReturn = -1;

    setReset(tempBoard);
    for (let i = 0; i < window.availableMoves.length; i++) {
      tempBoard[window.availableMoves[i]] = opponent;
      sumTriosReturned = window.sumTrios(tempBoard);

      for (let j = 0; j < 8; j++) {
        for (let k = 0; k < 8; k++) {
          if (sumTriosReturned[j] === opponent * 2 && sumTriosReturned[k] === opponent * 2 &&
            j !== k) {
            toReturn =
              window.theGameBoard[0] === opponent && window.theGameBoard[8] === opponent ||
              window.theGameBoard[2] === opponent && window.theGameBoard[6] === opponent ?
              emptySide() : window.availableMoves[i];
          }
        }
      }
      setReset(tempBoard);
    }

    return toReturn < 0 ? center() : toReturn;
  }

  function setFork() {
    const self = window.turn % 2 ? -1 : 1,
          tempBoard = new Array(9);

    let sumTriosReturned,
        toReturn = -1;

    setReset(tempBoard);
    for (let i = 0; i < window.availableMoves.length; i++) {
      tempBoard[window.availableMoves[i]] = self;
      sumTriosReturned = window.sumTrios(tempBoard);

      for (let j = 0; j < 8; j++) {
        for (let k = 0; k < 8; k++) {
          if (sumTriosReturned[j] === self * 2 && sumTriosReturned[k] === self * 2 && j !== k) {
            toReturn = window.availableMoves[i];
          }
        }
      }
      setReset(tempBoard);
    }

    return toReturn < 0 ? blockFork() : toReturn;
  }

  function canLoseInOne() {
    const opponent = window.turn % 2 ? 1 : -1,
          tempBoard = new Array(9);

    let sumTriosReturned,
        toReturn = -1;

    setReset(tempBoard);
    for (let i = 0; i < window.availableMoves.length; i++) {
      tempBoard[window.availableMoves[i]] = opponent;
      sumTriosReturned = window.sumTrios(tempBoard);

      for (let j = 0; j < 8; j++) {
        if (sumTriosReturned[j] === opponent * 3) {
          toReturn = window.availableMoves[i];
        }
      }
      setReset(tempBoard);
    }

    return toReturn < 0 ? setFork() : toReturn;
  }

  function canWinInOne() {
    const self = window.turn % 2 ? -1 : 1,
          tempBoard = new Array(9);

    let sumTriosReturned,
        toReturn = -1;

    setReset(tempBoard);
    for (let i = 0; i < window.availableMoves.length; i++) {
      tempBoard[window.availableMoves[i]] = self;
      sumTriosReturned = window.sumTrios(tempBoard);

      for (let j = 0; j < 8; j++) {
        if (sumTriosReturned[j] === self * 3) {
          toReturn = window.availableMoves[i];
        }
      }
      setReset(tempBoard);
    }

    return toReturn < 0 ? canLoseInOne() : toReturn;
  }

  return (difficulty) => {
    const chance = Math.floor(Math.random() * 100);

    let index;

    if (difficulty === '1') {
      index = chance < 33 ? canWinInOne() :
        window.availableMoves[Math.floor(Math.random(window.availableMoves.length))];
    } else if (difficulty === '2') {
      index = chance < 66 ? canWinInOne() :
        window.availableMoves[Math.floor(Math.random(window.availableMoves.length))];
    } else {
      index = canWinInOne();
    }

    return index;
  };
}());

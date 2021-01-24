'use strict';
(function() {
  const color = 'red',
        formData = (function getURIParameters(dict) {
          decodeURIComponent(window.location.search).substring(1).split('&').forEach(param => {
            const data = param.split('=');
            Object.defineProperty(dict, data[0], { value: data[1] });
          });

          return dict;
        }({}));

  function dispWin(winningCombo) {
    if (winningCombo < 3) {
      document.getElementById(`spot${winningCombo}`).style.color = color;
      document.getElementById(`spot${winningCombo + 3}`).style.color = color;
      document.getElementById(`spot${winningCombo + 6}`).style.color = color;
    } else if (winningCombo < 6) {
      if (winningCombo === 3) {
        document.getElementById('spot0').style.color = color;
        document.getElementById('spot1').style.color = color;
        document.getElementById('spot2').style.color = color;
      } else if (winningCombo === 4) {
        document.getElementById('spot3').style.color = color;
        document.getElementById('spot4').style.color = color;
        document.getElementById('spot5').style.color = color;
      } else {
        document.getElementById('spot6').style.color = color;
        document.getElementById('spot7').style.color = color;
        document.getElementById('spot8').style.color = color;
      }
    } else {
      document.getElementById('spot4').style.color = color;

      if (winningCombo === 6) {
        document.getElementById('spot0').style.color = color;
        document.getElementById('spot8').style.color = color;
      } else {
        document.getElementById('spot2').style.color = color;
        document.getElementById('spot6').style.color = color;
      }
    }

    if (window.confirm('Replay?')) {
      window.location.href = 'index.html';
    }
  }

  function gameStatus() {
    const boardSum = window.sumTrios(window.theGameBoard);

    let gameState = 2;

    for (let i = 0; i < 8 && gameState === 2; i++) {
      if (boardSum[i] === -3) {
        gameState = -1;
        dispWin(i);
      } else if (boardSum[i] === 3) {
        gameState = 1;
        dispWin(i);
      }
    }

    if (Math.abs(gameState) !== 1 && window.availableMoves.length) {
      gameState = 0;
    }

    if (gameState === 2 && window.confirm('Replay?')) {
      window.location.href = 'index.html';
    }

    return gameState;
  }

  function placeMove() {
    const move = this.id.charAt(4),
          index = window.availableMoves.indexOf(Number.parseInt(move, 10));

    if (window.turn++ % 2) {
      document.getElementById(this.id).innerHTML = 'O';
      window.theGameBoard[move] = -1;
    } else {
      document.getElementById(this.id).innerHTML = 'X';
      window.theGameBoard[move] = 1;
    }

    window.availableMoves.splice(index, 1);

    if (!gameStatus()) {
      document.getElementById(this.id).removeEventListener('click', placeMove);

      if (formData.mode === '1') {
        placeMoveAI();
      }
    } else {
      for (let i = 0; i < window.availableMoves.length; i++) {
        document.getElementById(`spot${window.availableMoves[i]}`)
          .removeEventListener('click', placeMove);
      }
    }
  }

  function placeMoveAI() {
    const index = window.nextMoveAI(formData.difficulty);

    if (window.turn++ % 2) {
      document.getElementById(`spot${index}`).innerHTML = 'O';
      window.theGameBoard[index] = -1;
    } else {
      document.getElementById(`spot${index}`).innerHTML = 'X';
      window.theGameBoard[index] = 1;
    }

    window.availableMoves.splice(window.availableMoves.indexOf(index), 1);

    if (gameStatus() === 0) {
      document.getElementById(`spot${index}`).removeEventListener('click', placeMove);
    } else {
      for (let i = 0; i < window.availableMoves.length; i++) {
        document.getElementById(`spot${window.availableMoves[i]}`)
          .removeEventListener('click', placeMove);
      }
    }
  }

  window.sumTrios = gameBoard => {
    const trioSum = new Array(8);

    // Column sums:
    trioSum[0] = gameBoard[0] + gameBoard[3] + gameBoard[6];
    trioSum[1] = gameBoard[1] + gameBoard[4] + gameBoard[7];
    trioSum[2] = gameBoard[2] + gameBoard[5] + gameBoard[8];
    // Row sums:
    trioSum[3] = gameBoard[0] + gameBoard[1] + gameBoard[2];
    trioSum[4] = gameBoard[3] + gameBoard[4] + gameBoard[5];
    trioSum[5] = gameBoard[6] + gameBoard[7] + gameBoard[8];
    // Diagonal sums:
    trioSum[6] = gameBoard[0] + gameBoard[4] + gameBoard[8];
    trioSum[7] = gameBoard[2] + gameBoard[4] + gameBoard[6];

    return trioSum;
  };

  window.addEventListener('load', () => {
    let currentSquare;

    window.availableMoves = new Array(9);
    window.theGameBoard = new Array(9);
    window.turn = 0;

    for (let i = 0; i < 9; i++) {
      currentSquare = document.getElementById(`spot${i}`);
      currentSquare.addEventListener('click', placeMove);
      window.theGameBoard[i] = 0;
      window.availableMoves[i] = i;
    }

    if (formData.goFirst !== '1' && formData.mode === '1') {
      placeMoveAI();
    }
  });

  window.alert('Welcome, click a spot to place a move.');
}());

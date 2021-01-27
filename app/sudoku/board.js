'use strict';
window.board = (function() {
  const board = new Array(9);

  let count;

  for (let i = 0; i < 9; i++) {
    board[i] = new Array(9);
  }

  function checkSingle(collection) {
    let isValid = true;

    collection.splice(0, collection.sort().lastIndexOf('-') + 1);
    count += collection.length;

    for (let i = 0; isValid && i < collection.length && collection.length > 1; i++) {
      isValid = collection[i] !== collection[i + 1];
    }

    return isValid;
  }

  function checkMultiple(fn) {
    let isValid = true;

    for (let i = 0; i < 9 && isValid; i++) {
      isValid = fn(i);
    }

    return isValid;
  }

  function checkBox(boxNumber) {
    const box = [];

    for (let i = 0; i < 9 && box.length < 9; i++) {
      for (let j = 0; j < 9 && box.length < 9; j++) {
        if (board[i][j].boxNumber === boxNumber) {
          box.push(board[i][j].value);
        }
      }
    }

    return checkSingle(box);
  }

  function checkBoxes() {
    return checkMultiple(checkBox);
  }

  function checkRow(rowNumber) {
    const row = [];

    for (let i = 0; i < 9; i++) {
      row.push(board[rowNumber][i].value);
    }

    return checkSingle(row);
  }

  function checkRows() {
    return checkMultiple(checkRow);
  }

  function checkColumn(colNumber) {
    const col = [];

    for (let i = 0; i < 9; i++) {
      col.push(board[i][colNumber].value);
    }

    return checkSingle(col);
  }

  function checkColumns() {
    return checkMultiple(checkColumn);
  }

  return {
    getSpot: location => {
      return board[location[0]][location[1]];
    },
    setSpot: spot => {
      board[spot.location[0]][spot.location[1]] = spot;
    },
    toString: () => {
      let stringToReturn = '';

      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          stringToReturn += board[i][j] + ' ';
        }

        stringToReturn += '\n';
      }

      return stringToReturn;
    },
    check: () => {
      count = 0;
      return checkRows() && checkColumns() && checkBoxes() ? count : 0;
    }
  };
}());

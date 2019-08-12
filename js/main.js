function randomNumber(n1, n2) {
  var randNumb = Math.floor(Math.random() * n2 + n1);
  return randNumb;
}

window.onload = function() {
  var newGame = new Sudoku(games);

  for (let i = 0; i < newGame.game.length; i++) {
    for (let j = 0; j < newGame.game[i].length; j++) {
      if (newGame.hiddenNumbers.indexOf(i + ", " + j) === -1) {
        $(
          "table tr:nth-child(" + (i + 1) + ") td:nth-child(" + (j + 1) + ")"
        ).text(newGame.game[i][j]);
      }
    }
  }
};

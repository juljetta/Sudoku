class Sudoku {
  constructor(games) {
    this.game = games[randomNumber(0, 9)];
    this.hiddenNumbers = [];
    for (let i = 0; i <= 30; i++) {
      var n1 = randomNumber(0, 9);
      var n2 = randomNumber(0, 9);
      this.hiddenNumbers.push(n1 + ", " + n2);
    }
  }
}

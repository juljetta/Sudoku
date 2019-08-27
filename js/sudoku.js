class Sudoku {
  openCells = 2;

  constructor(games) {
    this.game = games[this.randomNumber(0, 9)];
    this.hiddenNumbers = [];
    this.currentCell = null;
    for (let i = 0; i < this.openCells; i++) {
      var n1 = this.randomNumber(0, 9);
      var n2 = this.randomNumber(0, 9);
      this.hiddenNumbers.push(n1 + ", " + n2);
    }
  }

  findStartingCoordinates(i, j) {
    var startI = i - (i - Math.floor(i / 3) * 3);
    var startJ = j - (j - Math.floor(j / 3) * 3);
    return [startI, startJ];
  }

  randomNumber(n1, n2) {
    var randNumb = Math.floor(Math.random() * n2 + n1);
    return randNumb;
  }
}

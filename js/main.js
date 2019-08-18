window.onload = function() {
  var newGame = new Sudoku(games);

  $("td").addClass("openCell");

  //  Record numbers of the game in cells and hide random 30 numbers
  for (let i = 0; i < newGame.game.length; i++) {
    for (let j = 0; j < newGame.game[i].length; j++) {
      if (newGame.hiddenNumbers.indexOf(i + ", " + j) === -1) {
        $("table tr:nth-child(" + (i + 1) + ") td:nth-child(" + (j + 1) + ")")
          .text(newGame.game[i][j])
          .removeClass("openCell");
      }
    }
  }
  //Actions executed on click
  $(".openCell").click(function() {
    // Removing background color
    $("tr, td").removeClass("bg");
    newGame.currentCell = this;

    // Adding background color to the current raw
    $(newGame.currentCell)
      .parent()
      .addClass("bg");

    // Adding background color to the current column
    for (let i = 0; i < newGame.game.length; i++) {
      for (let j = 0; j < newGame.game[i].length; j++) {
        if (j === newGame.currentCell.cellIndex) {
          $(
            "table tr:nth-child(" + (i + 1) + ") td:nth-child(" + (j + 1) + ")"
          ).addClass("bg");
        }
      }
    }

    // Adding background to the square block
    var cellIndex = $(newGame.currentCell).index();
    var rowIndex = $(newGame.currentCell)
      .parent()
      .index();

    var startingCoordinates = newGame.findStartingCoordinates(
      rowIndex,
      cellIndex
    );
    var startI = startingCoordinates[0];
    var startJ = startingCoordinates[1];
    // debugger;
    for (let i = startI; i <= startI + 2; i++) {
      for (let j = startJ; j <= startJ + 2; j++) {
        $(
          "table tr:nth-child(" + (i + 1) + ") td:nth-child(" + (j + 1) + ")"
        ).addClass("bg");
      }
    }
  });

  window.addEventListener("keyup", function(event) {
    if (49 <= event.keyCode && event.keyCode <= 57) {
      const { currentCell, game } = newGame;
      $(currentCell).click();

      currentCell.innerText = event.key;

      var cellIndex = $(currentCell).index();
      var rowIndex = $(currentCell)
        .parent()
        .index();

      $("td").removeClass("correct");

      if (game[rowIndex][cellIndex] == event.key) {
        $(currentCell).addClass("correct");
      }
    } else {
      return false;
    }

    for (let i = 0; i < newGame.game.length; i++) {
      for (let j = 0; j < newGame.game[i].length; j++) {
        if (
          $(newGame.currentCell).text() ===
          $(
            "table tr:nth-child(" + (i + 1) + ") td:nth-child(" + (j + 1) + ")"
          ).text()
        ) {
          $(
            "table tr:nth-child(" + (i + 1) + ") td:nth-child(" + (j + 1) + ")"
          ).addClass("bg");
        }
      }
    }
  });
};

window.onload = function() {
  var newGame = new Sudoku(games);

  $("td").addClass("openCell");

  function getHTMLCell(i, j) {
    var cell = $(
      "table tr:nth-child(" + (i + 1) + ") td:nth-child(" + (j + 1) + ")"
    );
    return cell;
  }

  //  Record numbers of the game in cells and hide random 30 numbers
  for (let i = 0; i < newGame.game.length; i++) {
    for (let j = 0; j < newGame.game[i].length; j++) {
      if (newGame.hiddenNumbers.indexOf(i + ", " + j) === -1) {
        getHTMLCell(i, j)
          .text(newGame.game[i][j])
          .removeClass("openCell");
      }
    }
  }
  //Actions executed on click
  $(".openCell").click(function() {
    // Removing background color
    $("tr, td").removeClass("bg");
    $("td").removeClass("current-cell");

    newGame.currentCell = this;
    $(newGame.currentCell).addClass("current-cell");

    // Adding background color to the current raw
    $(newGame.currentCell)
      .parent()
      .addClass("bg");

    // Adding background color to the current column
    for (let i = 0; i < newGame.game.length; i++) {
      for (let j = 0; j < newGame.game[i].length; j++) {
        if (j === newGame.currentCell.cellIndex) {
          getHTMLCell(i, j).addClass("bg");
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
        getHTMLCell(i, j).addClass("bg");
      }
    }
  });

  window.addEventListener("keyup", function(event) {
    if (49 <= event.keyCode && event.keyCode <= 57) {
      const { currentCell, game } = newGame;
      $(currentCell).click();

      currentCell.innerText = event.key;

      // Validation with the final result
      // var cellIndex = $(currentCell).index();
      // var rowIndex = $(currentCell)
      //   .parent()
      //   .index();
      // $("td").removeClass("correct");
      // if (game[rowIndex][cellIndex] == event.key) {
      //   $(currentCell).addClass("correct");
      // }
      checkConflicts();
    } else {
      return false;
    }

    for (let i = 0; i < newGame.game.length; i++) {
      for (let j = 0; j < newGame.game[i].length; j++) {
        if ($(newGame.currentCell).text() === getHTMLCell(i, j).text()) {
          getHTMLCell(i, j).addClass("bg");
        }
      }
    }
  });
  function checkConflicts() {
    $("td").removeClass("conflict-cell");
    $("td").removeClass("conflict-open-cell");

    $(".openCell").each(function(_, cell) {
      if ($(cell).text() != "") {
        var inputValue = $(cell).text();
        var cellIndex = $(cell).index();
        var rowIndex = $(cell)
          .parent()
          .index();

        // Validating row
        for (let i = 0; i < 9; i++) {
          var currentHTMLCell = getHTMLCell(rowIndex, i);
          if (currentHTMLCell.text() == inputValue) {
            if (currentHTMLCell.hasClass("openCell")) {
              currentHTMLCell.addClass("conflict-open-cell");
            } else {
              currentHTMLCell.addClass("conflict-cell");
            }
          }
        }

        // Validating column
        for (let i = 0; i < 9; i++) {
          var currentHTMLCell = getHTMLCell(i, cellIndex);
          if (currentHTMLCell.text() == inputValue) {
            if (currentHTMLCell.hasClass("openCell")) {
              currentHTMLCell.addClass("conflict-open-cell");
            } else {
              currentHTMLCell.addClass("conflict-cell");
            }
          }
        }

        //Validating Square
        var startingCoordinates = newGame.findStartingCoordinates(
          rowIndex,
          cellIndex
        );
        var startI = startingCoordinates[0];
        var startJ = startingCoordinates[1];
        for (let i = startI; i <= startI + 2; i++) {
          for (let j = startJ; j <= startJ + 2; j++) {
            var currentHTMLCell = getHTMLCell(i, j);
            if (currentHTMLCell.text() == inputValue) {
              if (currentHTMLCell.hasClass("openCell")) {
                currentHTMLCell.addClass("conflict-open-cell");
              } else {
                currentHTMLCell.addClass("conflict-cell");
              }
            }
          }
        }
      }
    });
  }
};

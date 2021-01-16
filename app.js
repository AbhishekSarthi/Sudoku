// Init board
const b = new Board();

const touch = document.querySelector(".jumbotron");
const easy = document.querySelector(".easy");
const medium = document.querySelector(".medium");
const hard = document.querySelector(".hard");
const random = document.querySelector(".random");
const solve = document.querySelector(".solve");
let keys = document.querySelectorAll(".box");
let count = 0;
let board;

board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

fillBoard(board);

function getData(diff) {
  b.getBoard(diff).then((res) => {
    // console.log(res);
    board = res;
    // console.log(board);
    fillBoard(board);
  });
}
// getData();
//fill board with api board value;
function fillBoard(board) {
  board.forEach((val) => {
    val.forEach((v) => {
      keys[count].classList.remove("fixed");
      keys[count].classList.remove("update");
      if (v === 0) {
        keys[count].innerHTML = "-";
        keys[count].classList.add("update");
      } else {
        keys[count].classList.add("fixed");
        keys[count].innerHTML = v;
      }
      count += 1;
    });
  });
  count = 0;
}

// Change Sudoku values accordnig to user
let h = 1;
touch.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("box") &&
    !e.target.classList.contains("fixed")
  ) {
    // console.log(e.target);
    e.target.innerHTML = h++;
    if (h > 9) {
      h = 1;
    }
    // e.preventDefault();
  }
});

//Buttons for Difficulties
easy.addEventListener("click", (e) => {
  if (e.target.classList.contains("easy")) {
    diff = "easy";
    getData(diff);
    // console.log(diff);
  }
});

medium.addEventListener("click", (e) => {
  if (e.target.classList.contains("medium")) {
    diff = "medium";
    getData(diff);
  }
});
hard.addEventListener("click", (e) => {
  if (e.target.classList.contains("hard")) {
    diff = "hard";
    getData(diff);
  }
});
random.addEventListener("click", (e) => {
  if (e.target.classList.contains("random")) {
    diff = "random";
    getData(diff);
  }
});

// Solve Button
// console.log(board);
function solveSudoku(gameArr) {
  var emptySpot = nextEmtySpot(gameArr);
  var r = emptySpot[0];
  var c = emptySpot[1];

  // if the game is unsolvable don't even try to solve it
  if (!isValidSudoku(gameArr)) return gameArr;

  // if no vacant spot is left, board is solved
  if (r === -1) {
      return gameArr;
  };

  var possArr = possiblities(r, c, gameArr);

  for (var k = 0; k < possArr.length && nextEmtySpot(gameArr)[0] !== -1; k++) {
      gameArr[r][c] = possArr[k];
      solveSudoku(gameArr);
  }

  // if no possible value leads to a solution reset this value 
  if (nextEmtySpot(gameArr)[0] !== -1) gameArr[r][c] = 0;

  return gameArr;
}

function nextEmtySpot(gameArr) {
  for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
          if (gameArr[i][j] === 0) return [i, j];
      }
  }
  return [-1, -1];
}

function possiblities(r, c, gameArr) {
  var possArr = [];
  var row = [];
  var col = [];
  var quad = [];
  var k = 0;
  var l = 0;
  if (r <= 2) k = 0; else if (r <= 5) k = 3; else k = 6;
  if (c <= 2) l = 0; else if (c <= 5) l = 3; else l = 6;

  for (var i = 0; i < 9; i++) {
      row.push(gameArr[i][c]);
  }
  for (var j = 0; j < 9; j++) {
      col.push(gameArr[r][j]);
  }
  for (var i = k; i < k + 3; i++) {
      for (var j = l; j < l + 3; j++) {
          quad.push(gameArr[i][j]);
      }
  }

  for (var n = 1; n < 10; n++) {
      if (row.indexOf(n) === -1 && col.indexOf(n) === -1 && quad.indexOf(n) === -1) {
          possArr.push(n);
      }
  }
  return possArr;
}
function checkQuadrant(r, c, gameArr) {
  var qudarantArr = [];
  for (var i = r; i < r + 3; i++) {
      for (var j = c; j < c + 3; j++) {
          if (qudarantArr.indexOf(gameArr[i][j]) === -1 || gameArr[i][j] === 0) {
              qudarantArr.push(gameArr[i][j]);
          } else {
              return false;
          }
      }
  }
  return true;
}
function isValidSudoku(gameArr) {
  if (!checkQuadrant(0, 0, gameArr)) return false;
  if (!checkQuadrant(0, 3, gameArr)) return false;
  if (!checkQuadrant(0, 6, gameArr)) return false;

  if (!checkQuadrant(3, 0, gameArr)) return false;
  if (!checkQuadrant(3, 3, gameArr)) return false;
  if (!checkQuadrant(3, 6, gameArr)) return false;

  if (!checkQuadrant(6, 0, gameArr)) return false;
  if (!checkQuadrant(6, 3, gameArr)) return false;
  if (!checkQuadrant(6, 6, gameArr)) return false;

  for (var i = 0; i < gameArr.length; i++) {
      var rowNumbers = [];
      for (var j = 0; j < gameArr.length; j++) {
          if (rowNumbers.indexOf(gameArr[i][j]) === -1 || gameArr[i][j] === 0) {
              rowNumbers.push(gameArr[i][j]);
          } else {
              return false;
          }
      }
  }

  for (var i = 0; i < gameArr.length; i++) {
      var colNumbers = [];
      for (var j = 0; j < gameArr.length; j++) {
          if (colNumbers.indexOf(gameArr[j][i]) === -1 || gameArr[j][i] === 0) {
              colNumbers.push(gameArr[j][i]);
          } else {
              return false;
          }
      }
  }
  return true;
}

solve.addEventListener("click", () => {
  solveSudoku(board);
  fillBoard(board); 
});
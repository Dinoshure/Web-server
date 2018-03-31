let c = document.getElementById("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
let ctx = c.getContext("2d");
ctx.fillStyle = "#fff";

let start = false;

let squareSize = 5;
let rows = Math.floor(window.innerHeight / squareSize);
let cols = Math.floor(window.innerWidth / squareSize);

let cells = [];

for (i = 0; i < rows; i++) {
  let tmpArr = [];
  for (j = 0; j < cols; j++) {
    let cell = new Cell(i, j);
    tmpArr.push(cell);
  }

  cells.push(tmpArr);
}

function Cell(i, j) {
  this.y = i * squareSize;
  this.x = j * squareSize;
  this.w = squareSize;
  this.h = squareSize;

  this.nextState = false;
  this.alive = false;

  this.draw = function() {
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

// for (i = 0; i < cells.length; i++) {
//   for (j = 0; j < cells[i].length; j++) {
//     if (Math.random() > 0.8) {
//       cells[i][j].alive = true;
//     }
//   }
// }

let mX = 0;
let mY = 0;

window.addEventListener("keydown", function(e) {
  let key = e.keyCode;
  if (key == 13) {
    start = true;
  }

  if (key == 71) {
    //g
    x = ~~(mX / squareSize);
    y = ~~(mY / squareSize);

    cells[y + 0][x + 1].alive = true;
    cells[y + 1][x + 2].alive = true;
    cells[y + 2][x + 0].alive = true;
    cells[y + 2][x + 1].alive = true;
    cells[y + 2][x + 2].alive = true;
  }

  if (key == 80) {
    //p
    x = ~~(mX / squareSize);
    y = ~~(mY / squareSize);

    cells[y + 0][x + 2].alive = true;
    cells[y + 0][x + 3].alive = true;
    cells[y + 0][x + 4].alive = true;
    cells[y + 0][x + 8].alive = true;
    cells[y + 0][x + 9].alive = true;
    cells[y + 0][x + 10].alive = true;
    cells[y + 2][x + 0].alive = true;
    cells[y + 2][x + 5].alive = true;
    cells[y + 2][x + 7].alive = true;
    cells[y + 2][x + 12].alive = true;
    cells[y + 3][x + 0].alive = true;
    cells[y + 3][x + 5].alive = true;
    cells[y + 3][x + 7].alive = true;
    cells[y + 3][x + 12].alive = true;
    cells[y + 4][x + 0].alive = true;
    cells[y + 4][x + 5].alive = true;
    cells[y + 4][x + 7].alive = true;
    cells[y + 4][x + 12].alive = true;
    cells[y + 5][x + 2].alive = true;
    cells[y + 5][x + 3].alive = true;
    cells[y + 5][x + 4].alive = true;
    cells[y + 5][x + 8].alive = true;
    cells[y + 5][x + 9].alive = true;
    cells[y + 5][x + 10].alive = true;
    cells[y + 7][x + 2].alive = true;
    cells[y + 7][x + 3].alive = true;
    cells[y + 7][x + 4].alive = true;
    cells[y + 7][x + 8].alive = true;
    cells[y + 7][x + 9].alive = true;
    cells[y + 7][x + 10].alive = true;
    cells[y + 8][x + 0].alive = true;
    cells[y + 8][x + 5].alive = true;
    cells[y + 8][x + 7].alive = true;
    cells[y + 8][x + 12].alive = true;
    cells[y + 9][x + 0].alive = true;
    cells[y + 9][x + 5].alive = true;
    cells[y + 9][x + 7].alive = true;
    cells[y + 9][x + 12].alive = true;
    cells[y + 10][x + 0].alive = true;
    cells[y + 10][x + 5].alive = true;
    cells[y + 10][x + 7].alive = true;
    cells[y + 10][x + 12].alive = true;
    cells[y + 12][x + 2].alive = true;
    cells[y + 12][x + 3].alive = true;
    cells[y + 12][x + 4].alive = true;
    cells[y + 12][x + 8].alive = true;
    cells[y + 12][x + 9].alive = true;
    cells[y + 12][x + 10].alive = true;
  }
  if (key == 83) {
    //s
    x = ~~(mX / squareSize);
    y = ~~(mY / squareSize);

    cells[y + 0][x + 16].alive = true;
    cells[y + 1][x + 16].alive = true;
    cells[y + 1][x + 18].alive = true;
    cells[y + 1][x + 35].alive = true;
    cells[y + 2][x + 16].alive = true;
    cells[y + 2][x + 17].alive = true;
    cells[y + 2][x + 35].alive = true;
    cells[y + 2][x + 37].alive = true;
    cells[y + 3][x + 0].alive = true;
    cells[y + 3][x + 2].alive = true;
    cells[y + 3][x + 13].alive = true;
    cells[y + 3][x + 35].alive = true;
    cells[y + 3][x + 36].alive = true;
    cells[y + 4][x + 1].alive = true;
    cells[y + 4][x + 2].alive = true;
    cells[y + 4][x + 14].alive = true;
    cells[y + 4][x + 15].alive = true;
    cells[y + 5][x + 1].alive = true;
    cells[y + 5][x + 13].alive = true;
    cells[y + 5][x + 14].alive = true;
    cells[y + 8][x + 10].alive = true;
    cells[y + 8][x + 11].alive = true;
    cells[y + 8][x + 32].alive = true;
    cells[y + 8][x + 33].alive = true;
    cells[y + 9][x + 11].alive = true;
    cells[y + 9][x + 12].alive = true;
    cells[y + 9][x + 32].alive = true;
    cells[y + 9][x + 34].alive = true;
    cells[y + 9][x + 44].alive = true;
    cells[y + 9][x + 45].alive = true;
    cells[y + 9][x + 46].alive = true;
    cells[y + 10][x + 10].alive = true;
    cells[y + 10][x + 32].alive = true;
    cells[y + 10][x + 44].alive = true;
    cells[y + 11][x + 27].alive = true;
    cells[y + 11][x + 45].alive = true;
    cells[y + 12][x + 27].alive = true;
    cells[y + 12][x + 28].alive = true;
    cells[y + 13][x + 26].alive = true;
    cells[y + 13][x + 28].alive = true;
  }
  if (key == 73) {
    //i
    x = ~~(mX / squareSize);
    y = ~~(mY / squareSize);

    cells[y + 0][x + 3].alive = true;
    cells[y + 1][x + 2].alive = true;
    cells[y + 1][x + 3].alive = true;
    cells[y + 1][x + 4].alive = true;
    cells[y + 2][x + 1].alive = true;
    cells[y + 2][x + 2].alive = true;
    cells[y + 2][x + 4].alive = true;
    cells[y + 2][x + 5].alive = true;
    cells[y + 3][x + 0].alive = true;
    cells[y + 3][x + 1].alive = true;
    cells[y + 3][x + 2].alive = true;
    cells[y + 3][x + 4].alive = true;
    cells[y + 3][x + 5].alive = true;
    cells[y + 3][x + 6].alive = true;
    cells[y + 4][x + 0].alive = true;
    cells[y + 4][x + 1].alive = true;
    cells[y + 4][x + 2].alive = true;
    cells[y + 4][x + 4].alive = true;
    cells[y + 4][x + 5].alive = true;
    cells[y + 4][x + 6].alive = true;
    cells[y + 5][x + 0].alive = true;
    cells[y + 5][x + 1].alive = true;
    cells[y + 5][x + 2].alive = true;
    cells[y + 5][x + 4].alive = true;
    cells[y + 5][x + 5].alive = true;
    cells[y + 5][x + 6].alive = true;
    cells[y + 6][x + 0].alive = true;
    cells[y + 6][x + 1].alive = true;
    cells[y + 6][x + 2].alive = true;
    cells[y + 6][x + 4].alive = true;
    cells[y + 6][x + 5].alive = true;
    cells[y + 6][x + 6].alive = true;
    cells[y + 7][x + 1].alive = true;
    cells[y + 7][x + 2].alive = true;
    cells[y + 7][x + 4].alive = true;
    cells[y + 7][x + 5].alive = true;
    cells[y + 8][x + 2].alive = true;
    cells[y + 8][x + 3].alive = true;
    cells[y + 8][x + 4].alive = true;
    cells[y + 9][x + 3].alive = true;
  }

  if (key == 76) {
    //l
    x = ~~(mX / squareSize);
    y = ~~(mY / squareSize);

    cells[y + 0][x + 1].alive = true;
    cells[y + 0][x + 2].alive = true;
    cells[y + 1][x + 0].alive = true;
    cells[y + 1][x + 1].alive = true;
    cells[y + 1][x + 2].alive = true;
    cells[y + 1][x + 3].alive = true;
    cells[y + 2][x + 0].alive = true;
    cells[y + 2][x + 1].alive = true;
    cells[y + 2][x + 3].alive = true;
    cells[y + 2][x + 4].alive = true;
    cells[y + 3][x + 2].alive = true;
    cells[y + 3][x + 3].alive = true;
  }

  if (key == 66) {
    //b
    x = ~~(mX / squareSize);
    y = ~~(mY / squareSize);

    cells[y + 0][x + 0].alive = true;
    cells[y + 0][x + 1].alive = true;
    cells[y + 0][x + 4].alive = true;
    cells[y + 1][x + 5].alive = true;
    cells[y + 2][x + 0].alive = true;
    cells[y + 2][x + 5].alive = true;
    cells[y + 3][x + 2].alive = true;
    cells[y + 3][x + 3].alive = true;
    cells[y + 3][x + 5].alive = true;
    cells[y + 4][x + 3].alive = true;
    cells[y + 4][x + 4].alive = true;
    cells[y + 4][x + 5].alive = true;
    cells[y + 4][x + 7].alive = true;
    cells[y + 4][x + 8].alive = true;
    cells[y + 5][x + 4].alive = true;
    cells[y + 5][x + 5].alive = true;
    cells[y + 5][x + 6].alive = true;
    cells[y + 5][x + 7].alive = true;
    cells[y + 5][x + 8].alive = true;
    cells[y + 5][x + 9].alive = true;
    cells[y + 6][x + 4].alive = true;
    cells[y + 6][x + 5].alive = true;
    cells[y + 6][x + 10].alive = true;
    cells[y + 7][x + 4].alive = true;
    cells[y + 7][x + 5].alive = true;
    cells[y + 7][x + 6].alive = true;
    cells[y + 7][x + 8].alive = true;
    cells[y + 7][x + 9].alive = true;
    cells[y + 8][x + 0].alive = true;
    cells[y + 8][x + 7].alive = true;
    cells[y + 8][x + 8].alive = true;
    cells[y + 9][x + 0].alive = true;
    cells[y + 9][x + 1].alive = true;
    cells[y + 9][x + 2].alive = true;
    cells[y + 9][x + 3].alive = true;
    cells[y + 9][x + 4].alive = true;
    cells[y + 9][x + 5].alive = true;
    cells[y + 9][x + 6].alive = true;
    cells[y + 11][x + 0].alive = true;
    cells[y + 11][x + 1].alive = true;
    cells[y + 11][x + 2].alive = true;
    cells[y + 11][x + 3].alive = true;
    cells[y + 11][x + 4].alive = true;
    cells[y + 11][x + 5].alive = true;
    cells[y + 11][x + 6].alive = true;
    cells[y + 12][x + 0].alive = true;
    cells[y + 12][x + 7].alive = true;
    cells[y + 12][x + 8].alive = true;
    cells[y + 13][x + 4].alive = true;
    cells[y + 13][x + 5].alive = true;
    cells[y + 13][x + 6].alive = true;
    cells[y + 13][x + 8].alive = true;
    cells[y + 13][x + 9].alive = true;
    cells[y + 14][x + 4].alive = true;
    cells[y + 14][x + 5].alive = true;
    cells[y + 14][x + 10].alive = true;
    cells[y + 15][x + 4].alive = true;
    cells[y + 15][x + 5].alive = true;
    cells[y + 15][x + 6].alive = true;
    cells[y + 15][x + 7].alive = true;
    cells[y + 15][x + 8].alive = true;
    cells[y + 15][x + 9].alive = true;
    cells[y + 16][x + 3].alive = true;
    cells[y + 16][x + 4].alive = true;
    cells[y + 16][x + 5].alive = true;
    cells[y + 16][x + 7].alive = true;
    cells[y + 16][x + 8].alive = true;
    cells[y + 17][x + 2].alive = true;
    cells[y + 17][x + 3].alive = true;
    cells[y + 17][x + 5].alive = true;
    cells[y + 18][x + 0].alive = true;
    cells[y + 18][x + 5].alive = true;
    cells[y + 19][x + 5].alive = true;
    cells[y + 20][x + 0].alive = true;
    cells[y + 20][x + 1].alive = true;
    cells[y + 20][x + 4].alive = true;
  }
});

let painting = false;

window.addEventListener("mousedown", function(e) {
  painting = true;

  x = ~~(e.clientX / squareSize);
  y = ~~(e.clientY / squareSize);
  cells[y][x].alive = true;
})

window.addEventListener("mouseup", function() {
  painting = false;
})

window.addEventListener("mousemove", function(e) {
  if (painting) {
    x = ~~(e.clientX / squareSize);
    y = ~~(e.clientY / squareSize);
    cells[y][x].alive = true;
  }

  mX = e.clientX;
  mY = e.clientY;
})

function updateStates(i, j) {
  let aliveNeighbours = checkNeighbours(i, j);


  if (cells[i][j].alive && aliveNeighbours < 2) {
    cells[i][j].nextState = false;
  }
  if (cells[i][j].alive && (aliveNeighbours == 2 || aliveNeighbours == 3)) {
    cells[i][j].nextState = true;
  }
  if (cells[i][j].alive && aliveNeighbours > 3) {
    cells[i][j].nextState = false;
  }
  if (cells[i][j].alive == false && aliveNeighbours == 3) {
    cells[i][j].nextState = true;
  }
}

function update() {
  for (i = 0; i < cells.length; i++) {
    for (j = 0; j < cells[i].length; j++) {
      cells[i][j].alive = cells[i][j].nextState;
    }
  }
}

function checkNeighbours(i, j) {
  let aliveCells = 0;
  let count = 0;
  for (k = -1; k < 2; k++) {
    for (l = -1; l < 2; l++) {
      if (k != 0 || l != 0) {
        if (cells[i + k] != undefined) {
          if (cells[i + k][j + l] != undefined) {
            if (cells[i + k][j + l].alive) {
              aliveCells++;
            }
          }
        }
      }
    }
  }
  return aliveCells;
}

function render() {
  if (start) {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }

  for (i = 0; i < cells.length; i++) {
    for (j = 0; j < cells[i].length; j++) {
      if (start) {
        updateStates(i, j);
      }
      if (cells[i][j].alive) {
        cells[i][j].draw();
      }
    }
  }
  if (start) {
    update();
  }

  setTimeout(render, 50);
}

render();
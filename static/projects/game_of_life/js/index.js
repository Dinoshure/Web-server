let c = document.getElementById("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
let ctx = c.getContext("2d");
ctx.fillStyle = "#fff";

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

for (i = 0; i < cells.length; i++) {
  for (j = 0; j < cells[i].length; j++) {
    if (Math.random() > 0.8) {
      cells[i][j].alive = true;
    }
  }
}

function updateStates(i, j) {
  let aliveNeighbours = checkNeighbours(i, j);

  //console.log(aliveNeighbours);

  if (cells[i][j].alive && aliveNeighbours < 2) {
    cells[i][j].nextState = false;
    //console.log("KILL");
  }
  if (cells[i][j].alive && (aliveNeighbours == 2 || aliveNeighbours == 3)) {
    cells[i][j].nextState = true;
    //console.log("KILL");
  }
  if (cells[i][j].alive && aliveNeighbours > 3) {
    cells[i][j].nextState = false;
  }
  if (cells[i][j].alive == false && aliveNeighbours == 3) {
    cells[i][j].nextState = true;
    //console.log("BORN");
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
  //console.log(count);
  return aliveCells;
}

function render() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (i = 0; i < cells.length; i++) {
    for (j = 0; j < cells[i].length; j++) {
      updateStates(i, j);
      if (cells[i][j].alive) {
        cells[i][j].draw();
      }
    }
  }

  update();

  setTimeout(render, 50);
}

render();
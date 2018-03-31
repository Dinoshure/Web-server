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

  this.on = false;

  this.draw = function() {
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

let ant = new Ant();

function Ant() {
  this.cellY = Math.round(cells.length / 2);
  this.cellX = Math.round(cells[cells.length - 1].length / 2);
  this.x = cells[this.cellY][this.cellX].x;
  this.y = cells[this.cellY][this.cellX].y;
  this.w = squareSize;

  this.direction = "left";

  this.draw = function() {
    ctx.fillRect(this.x, this.y, this.w, this.w);
  }
}

function update() {
  if (!cells[ant.cellY][ant.cellX].on) {
    cells[ant.cellY][ant.cellX].on = true;

    if (ant.direction == "up") {
      ant.direction = "right";
      ant.cellX += 1;
    } else if (ant.direction == "right") {
      ant.direction = "down";
      ant.cellY += 1;
    } else if (ant.direction == "down") {
      ant.direction = "left";
      ant.cellX -= 1;
    } else if (ant.direction == "left") {
      ant.direction = "up";
      ant.cellY -= 1;
    }
  } else {
    cells[ant.cellY][ant.cellX].on = false;

    if (ant.direction == "up") {
      ant.direction = "left";
      ant.cellX -= 1;
    } else if (ant.direction == "right") {
      ant.direction = "up";
      ant.cellY -= 1;
    } else if (ant.direction == "down") {
      ant.direction = "right";
      ant.cellX += 1;
    } else if (ant.direction == "left") {
      ant.direction = "down";
      ant.cellY += 1;
    }
  }
}

let step = 0;

function render() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (i = 0; i < cells.length; i++) {
    for (j = 0; j < cells[i].length; j++) {
      if (cells[i][j].on) {
        ctx.fillStyle = "#000";
        cells[i][j].draw();
      }
    }
  }

  update();
  ant.draw();
  window.requestAnimationFrame(render);
}

render();
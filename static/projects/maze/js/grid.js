const c = document.getElementById("canvas");
const size = Math.round(window.innerHeight) - 20;
c.width = size;
c.height = size;
const ctx = c.getContext("2d");
ctx.strokeStyle = "#fff";

let rows = 50;
let cols = 50;
let w = size / cols;
let cells = [];

for (i = 0; i < rows; i++) {
  let tempArr = [];
  for (j = 0; j < cols; j++) {
    let cell = new Cell(i, j);
    tempArr.push(cell);
  }

  cells.push(tempArr);
}

function Cell(i, j) {
  this.x = j * w;
  this.y = i * w;
  this.i = i;
  this.j = j;

  this.visited = false;

  this.walls = [true, true, true, true];

  this.draw = function() {
    ctx.beginPath();
    if (this.walls[0]) {
      //top
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + w, this.y);
    }
    if (this.walls[1]) {
      //right
      ctx.moveTo(this.x + w, this.y);
      ctx.lineTo(this.x + w, this.y + w);
    }
    if (this.walls[2]) {
      //bottom
      ctx.moveTo(this.x + w, this.y + w);
      ctx.lineTo(this.x, this.y + w);
    }
    if (this.walls[3]) {
      //left
      ctx.moveTo(this.x, this.y + w);
      ctx.lineTo(this.x, this.y);
    }
    ctx.stroke();
  }
}
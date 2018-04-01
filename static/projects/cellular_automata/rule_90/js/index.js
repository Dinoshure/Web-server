const CANVAS = document.getElementById("canvas");
CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight;

let ctx = CANVAS.getContext("2d");
ctx.fillStyle = "#000";

let squareSize = 1;
let cols = Math.floor(window.innerWidth / squareSize);

let cells = [];

for (let i = 0; i < cols; i++) {
  cells.push(new Cell(i));
}

function Cell(i) {
  this.x = i * squareSize;
  this.y = 0;

  //this.state = 0;
  //this.state = Math.random() > 0.75 ? 1 : 0;
  this.state = Math.round(Math.random());
  this.nextState = 0;


  this.draw = function() {
    ctx.fillRect(this.x, this.y, squareSize, squareSize);
  }

  this.update = function() {
    this.state = this.nextState;
  }
}

//cells[Math.round(cells.length / 2)].state = 1;

function newStates(arr) {
  let states = [];

  let ln = 0;
  let rn = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i - 1] != undefined) {
      ln = arr[i - 1].state;
    }
    if (arr[i + 1] != undefined) {
      rn = arr[i + 1].state;
    }

    if (rn != ln) {
      states.push(1);
    } else {
      states.push(0);
    }
  }

  return states;
}

function setStates(arr) {
  for (let i = 0; i < cells.length; i++) {
    cells[i].nextState = arr[i];
  }
}

function updateStates() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].update();
  }
}

function render() {
  //ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < cells.length; i++) {
    if (cells[i].state == 1) {
      cells[i].draw();
    }
    cells[i].y += squareSize;
  }

  setStates(newStates(cells));
  updateStates();

  if (cells[0].y < window.innerHeight + squareSize) {
    window.requestAnimationFrame(render);
  }
}

render();
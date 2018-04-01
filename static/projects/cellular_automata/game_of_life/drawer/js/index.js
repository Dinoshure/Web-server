let c = document.getElementById("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
let ctx = c.getContext("2d");
ctx.fillStyle = "#000";
ctx.strokeStyle = "#000";

let start = false;

let squareSize = 20;
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


  this.alive = false;

  this.draw = function() {
    if (this.alive) {
      ctx.fillRect(this.x, this.y, this.w, this.h);
    } else {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.w, this.h);
      ctx.stroke();
    }
  }
}

let mX = 0;
let mY = 0;


window.addEventListener("keydown", function(e) {
  let key = e.keyCode;

  if (key == 13) {
    //enter
    run();
  }

  if (key == 66) {
    //b
    window.location.replace("http://localhost:8000/projects/cellular_automata/game_of_life/");
  }

  if (key == 72) {
    //h
    window.location.replace("http://localhost:8000/projects/cellular_automata/game_of_life/help/");
  }
});

let painting = false;

window.addEventListener("mousedown", function(e) {
  painting = true;
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

function render() {
  for (i = 0; i < cells.length; i++) {
    for (j = 0; j < cells[i].length; j++) {
      cells[i][j].draw();
    }
  }

  window.requestAnimationFrame(render);
}

render();

function run() {
  let aliveCells = [];

  for (i = 0; i < cells.length; i++) {
    for (j = 0; j < cells[i].length; j++) {
      if (cells[i][j].alive) {
        aliveCells.push(cells[i][j]);
      }
    }
  }

  let lowX = findLowestX(aliveCells);
  let lowY = findLowestY(aliveCells);
  let highX = findHighestX(aliveCells);
  let highY = findHighestY(aliveCells);

  let boxCols = Math.ceil((highX - lowX) / squareSize) + 1;
  let boxRows = Math.ceil((highY - lowY) / squareSize) + 1;

  let checkArea = [];

  for (i = 0; i < boxRows; i++) {
    checkArea.push([]);
    for (j = 0; j < boxCols; j++) {
      checkArea[i].push(cells[i + (lowY / squareSize)][j + (lowX / squareSize)]);
    }
  }

  let coords = [];

  for (i = 0; i < checkArea.length; i++) {
    for (j = 0; j < checkArea[i].length; j++) {
      if (checkArea[i][j].alive) {
        coords.push({
          y: i,
          x: j
        });
      }
    }
  }

  //console.log(checkArea);
  //console.log(coords);

  for (i = 0; i < coords.length; i++) {
    let code = "";
    code += "<pre>cells[y + " + coords[i].y + "][x + " + coords[i].x + "].alive = true;</pre>";
    document.write(code);
  }

  //ctx.fillRect(lowX, lowY, highX - lowX, highY - lowY);
}

function findLowestX(arr) {
  let currentLowest = arr[0].x;

  for (i = 0; i < arr.length; i++) {
    if (arr[i].x < currentLowest) {
      currentLowest = arr[i].x
    }
  }

  return currentLowest;
}

function findLowestY(arr) {
  let currentLowest = arr[0].y;

  for (i = 0; i < arr.length; i++) {
    if (arr[i].y < currentLowest) {
      currentLowest = arr[i].y
    }
  }

  return currentLowest;
}

function findHighestY(arr) {
  let currentHightest = arr[0].y;

  for (i = 0; i < arr.length; i++) {
    if (arr[i].y > currentHightest) {
      currentHightest = arr[i].y;
    }
  }

  return currentHightest;
}

function findHighestX(arr) {
  let currentHightest = arr[0].x;

  for (i = 0; i < arr.length; i++) {
    if (arr[i].x > currentHightest) {
      currentHightest = arr[i].x;
    }
  }

  return currentHightest;
}
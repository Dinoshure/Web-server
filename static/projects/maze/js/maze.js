let ci = 0;
let cj = 0;
let finished = false;
let current = cells[ci][cj];
let cellsVisited = [];
current.visited = true;

function show() {
  if (finished == false) {
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(current.x, current.y, w, w);
  } else {
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(cells[0][0].x, cells[0][0].y, w, w);
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(cells[cells.length - 1][cells[cells.length - 1].length - 1].x, cells[cells.length - 1][cells.length - 1].y, w, w);
  }
}

function update() {
  if (checkVisited()) {
    if (cellHasUnvisitedNeighbours(ci, cj)) {
      let randomNeighbour = getRandomNeighbour(ci, cj);
      let ni = randomNeighbour.i;
      let nj = randomNeighbour.j;
      cellsVisited.push(current);
      removeWall(ci, cj, ni, nj);
    } else if (cellsVisited.length != 0) {
      current = cellsVisited.pop();
      ci = current.i;
      cj = current.j;
      current.visited = true;
    }
  } else {
    finished = true;
  }
}

function removeWall(i, j, ni, nj) {
  if (ni > i) {
    cells[i][j].walls[2] = false;
    if (cells[i + 1] != undefined) {
      cells[i + 1][j].walls[0] = false;
    }
  }
  if (ni < i) {
    cells[i][j].walls[0] = false;
    if (cells[i - 1] != undefined) {
      cells[i - 1][j].walls[2] = false;
    }
  }
  if (nj > j) {
    cells[i][j].walls[1] = false;
    if (cells[i][j + 1] != undefined) {
      cells[i][j + 1].walls[3] = false;
    }
  }
  if (nj < j) {
    cells[i][j].walls[3] = false;
    if (cells[i][j - 1] != undefined) {
      cells[i][j - 1].walls[1] = false;
    }
  }
  current = cells[ni][nj];
  ci = ni;
  cj = nj;
  current.visited = true;
}

function getRandomNeighbour(i, j) {
  let neighbours = getUnvisitedNeighbours(i, j);

  let r = Math.floor(Math.random() * neighbours.length)
  let rerturnedNeighbour = neighbours[r];

  return rerturnedNeighbour;
}

function getUnvisitedNeighbours(i, j) {
  let unvisitedNeighbours = [];

  if (cells[i - 1] != undefined) {
    if (cells[i - 1][j].visited == false) {
      unvisitedNeighbours.push({
        i: i - 1,
        j: j
      });
    }
  }
  if (cells[i][j - 1] != undefined) {
    if (cells[i][j - 1].visited == false) {
      unvisitedNeighbours.push({
        i: i,
        j: j - 1
      });
    }
  }
  if (cells[i + 1] != undefined) {
    if (cells[i + 1][j].visited == false) {
      unvisitedNeighbours.push({
        i: i + 1,
        j: j
      });
    }
  }
  if (cells[i][j + 1] != undefined) {
    if (cells[i][j + 1].visited == false) {
      unvisitedNeighbours.push({
        i: i,
        j: j + 1
      });
    }
  }
  return unvisitedNeighbours;
}

function cellHasUnvisitedNeighbours(i, j) {
  if (cells[i - 1] != undefined) {
    if (cells[i - 1][j].visited == false) {
      return true;
    }
  }
  if (cells[i][j - 1] != undefined) {
    if (cells[i][j - 1].visited == false) {
      return true;
    }
  }
  if (cells[i + 1] != undefined) {
    if (cells[i + 1][j].visited == false) {
      return true;
    }
  }
  if (cells[i][j + 1] != undefined) {
    if (cells[i][j + 1].visited == false) {
      return true;
    }
  } else {
    return false;
  }
}

function checkVisited() {
  for (i = 0; i < cells.length; i++) {
    for (j = 0; j < cells.length; j++) {
      if (cells[i][j].visited == false) {
        return true;
      }
    }
  }
}
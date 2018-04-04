let c = document.getElementById("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
let ctx = c.getContext("2d");
let spacing = 35;
let cols = Math.ceil(window.innerWidth / spacing + 1);
let rows = Math.ceil(window.innerHeight / spacing + 1);
let count = 0;

ctx.fillStyle = "#1ef138";
ctx.font = spacing + "px Matrix Code NFI";
let streamXs = [];

let streams = [];

for (let i = 0; i < cols * 2; i++) {
  newStream(i);
}

function newStream(i) {
  let streamY = -(Math.floor((Math.random() * window.innerHeight) / spacing));
  let streamX = Math.floor((Math.random() * window.innerWidth) / spacing);

  streams.push([new Stream(streamX, streamY)]);

  for (j = 0; j < streams[i][0].len; j++) {
    streams[i].push(new Char(streams[i][0].x, streams[i][streams[i].length - 1].y - spacing, streams[i][0].speed, streams[i][0].size, streams[i][0]));
  }
}

function Stream(x, y) {
  this.x = x * spacing;
  this.y = y * spacing;

  this.len = Math.floor(Math.random() * 30) + 10;
  this.speed = Math.floor(Math.random() * 5) + 5;
  this.size = Math.floor(Math.random() * 10) + spacing - 5;

  this.char = chars[Math.floor(Math.random() * chars.length)];

  this.head = true;

  this.draw = function() {
    if (this.head) {
      ctx.fillStyle = "#fff";
    }
    ctx.fillText(this.char, this.x, this.y);
  }

  this.move = function() {
    this.y += this.speed * (spacing / 25);
  }

  this.offScreen = function() {
    if (this.y > window.innerHeight + spacing + (this.len * spacing)) {
      return true;
    } else {
      return false;
    }
  }

  this.updateChar = function() {
    this.char = chars[Math.floor(Math.random() * chars.length)];
  }
}

function Char(x, y, v, s, streamHead) {
  this.x = x;
  this.y = y;
  this.char = chars[Math.floor(Math.random() * chars.length)];

  this.speed = v;
  this.size = s;

  this.r = 23;
  this.g = 241;
  this.b = 56;

  if (this.y > (streamHead.y - (spacing * (streamHead.len - 15)))) {
    this.a = (Math.random() * 0.5) + 0.5;
  } else {
    let value = 20;
    while (value > 0) {
      if (this.y <= (streamHead.y - (spacing * (streamHead.len - value)))) {
        this.a = 0 + (value * 0.05);
      }

      value--;
    }
  }

  this.color = "rgba(" + this.r + ", " + this.g + ", " + this.b + ", " + this.a + ")"
  this.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillText(this.char, this.x, this.y);
  }

  this.move = function() {
    this.y += this.speed * (spacing / 25);
  }

  this.updateChar = function() {
    this.char = chars[Math.floor(Math.random() * chars.length)];
  }
}

function render() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
  //ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < streams.length; i++) {
    ctx.font = streams[i][0].size + "px Matrix Code NFI";
    for (let j = 0; j < streams[i].length; j++) {
      streams[i][j].draw();
      streams[i][j].move();

      if (streams[i][0].offScreen()) {
        streams.splice(i, 1);
        streamXs.splice(i, 1);
        count--;
        newStream(streams.length);
      }

      if (Math.random() > 0.92) {
        streams[i][j].updateChar();
      }
    }
  }

  window.requestAnimationFrame(render);
}

render();

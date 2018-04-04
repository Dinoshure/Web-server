let c = document.getElementById("canvas");
c.width = window.innerWidth;
c.height = window.innerHeight;
let ctx = c.getContext("2d");
ctx.strokeStyle = "#fff";

let stars = [];

for (let i = 0; i < 200; i++) {
  stars.push(new Star());
}


function Star() {
  this.y = window.innerHeight / 2;
  this.x = window.innerWidth / 2;
  this.z = 0;

  this.vel = {
    x: 5,
    y: 5
  }

  if (Math.random() > 0.5) {
    this.vel.x *= -1;
  }

  this.desired = {
    x: Math.floor(Math.random() * window.innerWidth),
    y: Math.floor(Math.random() * window.innerHeight)
  }


  this.a = getAngle(this.x, this.y, this.desired.x, this.desired.y);
  this.pr = Math.sqrt(Math.pow(this.vel.x, 2) + Math.pow(this.vel.y, 2));
  if (this.vel.x > 0) {
    this.pr *= -1;
  }

  this.newPos = ptc(this.a, this.pr - (this.vel.x * 5));

  this.draw = function() {
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = this.z
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.newPos.x, this.y + this.newPos.y);
    ctx.stroke();
  }

  this.move = function() {

    this.x += this.newPos.x;
    this.y += this.newPos.y;
    this.z += 0.06;

    if (this.vel.x < 0) {
      this.vel.x -= this.z;
    } else {
      this.vel.x += this.z;
    }
    this.vel.y += this.z;
  }

  this.offScreen = function() {
    if (this.x < 0 || this.x > window.innerWidth || this.y < 0 || this.y > window.innerHeight) {
      return true;
    }
  }
}

function ptc(a, r) {
  return {
    x: (r * Math.cos(a)),
    y: (r * Math.sin(a))
  };
}

function getAngle(x1, y1, x2, y2) {
  let xDiff = x2 - x1;
  let yDiff = y2 - y1;

  if (xDiff != 0) {
    let angle = Math.atan(yDiff / xDiff);
    return angle;
  } else {
    let angle = 0;
    return angle;
  }

}

function map(val, a, b, c, d) {
  let ratio = Math.abs(d - c) / Math.abs(b - a);
  return (val * ratio) + c;
}

function render() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = 0; i < stars.length; i++) {
    stars[i].draw();
    stars[i].move();

    if (stars[i].offScreen()) {
      stars.splice(i, 1);
      stars.push(new Star());
    }
  }

  window.requestAnimationFrame(render);
}

render();
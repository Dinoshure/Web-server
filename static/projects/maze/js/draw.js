function render() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerWidth);
  for (i = 0; i < cells.length; i++) {
    for (j = 0; j < cells[i].length; j++) {
      cells[i][j].draw();
    }
  }
  update();
  show();
  window.requestAnimationFrame(render);
}
render();
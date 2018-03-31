function render() {
  ctx.clearRect(0, 0, size, size);
  for (i = 0; i < cells.length; i++) {
    for (j = 0; j < cells.length; j++) {
      cells[i][j].draw();
    }
  }
  update();
  show();
  window.requestAnimationFrame(render);
}
render();
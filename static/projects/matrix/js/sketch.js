var font;
function preload() {
    font = loadFont("assets/fonts/matrix_code_nfi.otf");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont(font);
    fill(255, 255, 255);
    
    createStream();
}

frame = 0;

function draw() {
    background(0);
    
    drawLetter();
    
    frame++;
}
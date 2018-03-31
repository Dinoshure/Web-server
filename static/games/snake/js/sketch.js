var cnvHeight = 660;
var cnvWidth = 660;

//creates a grid
var gridSize = 30;
var squareSize = cnvWidth / gridSize;
var grid = [];

var alive = false;
var playedOnce = false;

for(i = 0; i < gridSize + 1; i++) {
    tempArr = [];
    for(j = 0; j < gridSize + 1; j++) {
        var coord = {
            x: j * squareSize,
            y: i * squareSize
        }
        tempArr.push(coord);
    }
    grid.push(tempArr);
}


var posX = posY = 1;

var bodyOne = {
    x: grid[posY][posX].x,
    y: grid[posY][posX].y
}

var snake = [bodyOne];

//sets the direction for the snake to move
var direction;
function controlSnake() {
    if(keyIsDown(RIGHT_ARROW)) {
        direction = "right";
    }
    if(keyIsDown(LEFT_ARROW)) {
        direction = "left";
    }
    if(keyIsDown(UP_ARROW)) {
        direction = "up";
    }
    if(keyIsDown(DOWN_ARROW)) {
        direction = "down";
    }   
}

var newPos = {
    x: snake[0].x,
    y: snake[0].y
}

//moves the snake
function moveSnake() {
    if (direction === "right") {
        newPos = {
            x: (snake[0].x + squareSize),
            y: snake[0].y
        }
    } else if(direction === "left") {
        newPos = {
            x: snake[0].x - squareSize,
            y: snake[0].y
        }
    } else if(direction === "down") {
        newPos = {
            x: snake[0].x,
            y: snake[0].y  + squareSize
        }
    } else if(direction === "up") {
        newPos = {
            x: snake[0].x,
            y: snake[0].y  - squareSize
        }
    }
    posX = newPos.x;
    posY = newPos.y 
}

//makes the snake move and follows it self
var lastPos;
function updateSnake() {
    snake.unshift(newPos);
    snake.shift();
    snake.unshift(newPos);
    lastPos = snake.pop()
}

//draws the snake
function drawSnake() {
    for(i = 0; i < snake.length; i++) {
        rect(snake[i].x, snake[i].y, squareSize, squareSize);   
    }
}

//grows the snake
var newBody = {
    x: 0,
    y: 0
}
function growSnake() {
    newBody.x = lastPos.x;
    newBody.y = lastPos.y;
    snake.push(newBody);
}

//checks to see if the snake has crashed into himself
function checkDeath() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    
    for(i = 1; i < snake.length; i++) {
        var snakeBodyX = snake[i].x;
        var snakeBodyY = snake[i].y;
        
        if(snakeHeadX === snakeBodyX && snakeHeadY === snakeBodyY) {
            alive = false;
        }
    }
    
    playedOnce = true;
}

//creates the food and checks if it has been eaten
eaten = false;
var foodX = (Math.floor(Math.random() * (grid.length - 1)));
var foodY = (Math.floor(Math.random() * (grid.length - 1)));
var foodPos = grid[foodX][foodY];

function food() {
    foodX = (Math.floor(Math.random() * (grid.length - 1)));
    foodY = (Math.floor(Math.random() * (grid.length - 1)));
    foodPos = grid[foodX][foodY];   
}

//if the snake goes off screen, it loops over to the other side
function loopSnake() {
    if(snake[0].x < 0) {
        newPos.x = cnvWidth - squareSize;
    }
    if(snake[0].x > cnvWidth - squareSize) {
        newPos.x = 0;
    }
    if(snake[0].y < 0) {
        newPos.y = cnvHeight - squareSize;
    }
    if(snake[0].y > cnvHeight - squareSize) {
        newPos.y = 0;
    }
}

function gameOver() {
    textAlign(CENTER);
    var message;
    if(playedOnce) {
        textSize(50);
        text("GAME OVER!", cnvWidth / 2, 230);
        textSize(30);
        text("Score: " + score, cnvWidth / 2, 270);
        message = "restart";
    } else {
        textSize(60);
        text("SNAKE!", cnvWidth / 2, 140);
        textSize(25);
        text("Red square are food and make you grow", cnvWidth / 2, 230);
        text("Use the arrow keys to move", cnvWidth / 2, 270);
        text("Don't crash into your self!")
        
        message = "start";
    }
    textSize(18);
    text("Press any key to " + message, cnvWidth/2, 450);   
}

function keyPressed() {
    if(alive === false) {
        posX = posY = 1;
        
        bodyOne.x = grid[posY][posX].x;
        bodyOne.y = grid[posY][posX].y;
        
        snake = [bodyOne];
        
        direction = null;
        
        newPos.x = snake[0].x;
        newPos.y = snake[0].y;
        
        score = 0;
        
        alive = true;
    }
}

//var font;
//function preload() {
//    font = loadFont("C:\Users\jjwat\Desktop\Git Stuff\Web-server\tests\Snake\FixedsysExcelsiorIIIb.otf");
//}

function setup() {
    var cnv = createCanvas(cnvWidth, cnvHeight);
    
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2 + 100;
    cnv.position(x, y);
    
    fill(0, 255, 0);
    strokeWeight(2);
    stroke(10);
}

var frame = 0;
var score = 0;
function draw() {
    background(10);
    if(alive) {
        if(eaten) {
            food();
            eaten = false;
            score += 10;
        }
        
        for(i = 0; i < snake.length; i++) {
            if(snake[i].x === foodPos.x && snake[i].y === foodPos.y) {
                eaten = true;
                growSnake();
            }   
        }

        loopSnake();
        checkDeath();
        drawSnake();
        controlSnake();
        
        if(frame % 8 === 0) {
            moveSnake(); 
            updateSnake();
        }
        
        fill(255, 0, 0);
        rect(foodPos.x, foodPos.y, squareSize, squareSize);
        fill(0, 255, 0);

        frame++;   
    } else {
        gameOver();
    }
}
var cols = 200;
var squareSize = window.innerWidth / cols;
var rows = Math.ceil(window.innerHeight / squareSize);
var grid = [];

var coord = {
    x: null,
    y: null
}

for(i = 0; i < cols; i++) {
    var tempArr = [];
    for(j = 0; j < rows + 1; j++) {
        coord.x = i * squareSize;
        coord.y = -window.innerHeight + (j * squareSize);
        
        tempArr.push({...coord});
    }
    grid.push(tempArr);
}

var chars = "qwertyuiopasdfghjklzxcvbnm1234567890$-+*/=%#&(),.;:?!|{}<>[]^~";

var streams = [];
var streamSpace = {};

function createStream() {
    for(i = 0; i < 200; i++) {
        streamSpace.x = grid[randint(0, cols)][0].x;
        streamSpace.z = randint(1, 4);
        streamSpace.char = chars[randint(0, chars.length)];
        streamSpace.head = true;
        streamSpace.headCol = false; 
        if(streamSpace.z === 1){streamSpace.size = 3;}
        if(streamSpace.z === 2){streamSpace.size = 2;}
        if(streamSpace.z === 3){streamSpace.size = 1;}
        streamSpace.y = grid[0][randint(0, rows/streamSpace.size) * streamSpace.size].y;
        
        tempArr = [{...streamSpace}];
        var streamLen = randint(10, 20);
        for(j = 0; j < streamLen; j++) {
            streamSpace.y = tempArr[j].y - squareSize * tempArr[0].size;
            streamSpace.char = chars[randint(0, chars.length)];
            streamSpace.head = false;
            streamSpace.headCol = false;
            
            tempArr.push({...streamSpace});
        }
        streams.push(tempArr);                
    }
}

function drawLetter() {
    for(i = 0; i < streams.length; i++) {
        for(j = 0; j < streams[i].length; j++) {
            setTextStyle(streams[i][j]);
            fadeOut(streams[i], streams[i][j]);
            if(streams[i][j] === streams[i][0]) {
                if(streams[i][j].z === 1){fill(255, 255, 255);}
                if(streams[i][j].z === 2){fill(195, 195, 195);}
                if(streams[i][j].z === 3){fill(140, 140, 140);}
            }
            changeChar(streams[i][j]);
            text(streams[i][j].char, streams[i][j].x, streams[i][j].y);
            streams[i][j].y += squareSize * streams[i][0].size;
            
            if(streams[i][streams[i].length - 1].y > window.innerHeight) {
                var newY = grid[0][randint(0, rows/streams[i][0].size) * streams[i][0].size].y;
                var newX = grid[randint(0, cols)][0].x;
                for(k = 0; k < streams[i].length; k++) {
                    streams[i][j].x = newX;
                    streams[i][k].y = newY;
                    newY -= squareSize * streams[i][0].size;
                }
            }
        }
    }
}

function changeChar(obj) {
    var num = randint(0, 3);
    if(frame % num === 0) {
        obj.char = chars.substr(randint(0, chars.length), 1);
    }
}

function setTextStyle(obj) {
    if(obj.z === 1){fill(103, 243, 131); textSize(obj.size * squareSize);}
    if(obj.z === 2){fill(2, 225, 72); textSize(obj.size * squareSize);}
    if(obj.z === 3){fill(8, 98, 19); textSize(obj.size * squareSize);}
}

function fadeOut(arr, obj) {
    if(obj.z === 1) {
        if(obj === arr[arr.length - 1]){fill(0);}
        if(obj === arr[arr.length - 2]){fill(1, 4, 2);}
        if(obj === arr[arr.length - 3]){fill(3, 8, 4);}
        if(obj === arr[arr.length - 4]){fill(5, 13, 7);}
        if(obj === arr[arr.length - 5]){fill(11, 26, 14);}
        if(obj === arr[arr.length - 6]){fill(17, 40, 21);}
        if(obj === arr[arr.length - 7]){fill(34, 81, 43);}
        if(obj === arr[arr.length - 8]){fill(51, 121, 65);}
        if(obj === arr[arr.length - 9]){fill(68, 162, 87);}
        if(obj === arr[arr.length - 10]){fill(85, 202, 109);}   
    } else if(obj.z === 2) {
        if(obj === arr[arr.length - 1]){fill(0);}
        if(obj === arr[arr.length - 2]){fill(0, 5, 1);}
        if(obj === arr[arr.length - 3]){fill(0, 11, 3);}
        if(obj === arr[arr.length - 4]){fill(0, 16, 5);}
        if(obj === arr[arr.length - 5]){fill(0, 22, 7);}
        if(obj === arr[arr.length - 6]){fill(0, 45, 14);}
        if(obj === arr[arr.length - 7]){fill(0, 90, 28);}
        if(obj === arr[arr.length - 8]){fill(1, 135, 43);}
        if(obj === arr[arr.length - 9]){fill(1, 135, 43);}
        if(obj === arr[arr.length - 10]){fill(1, 180, 57);}   
    } else if(obj.z === 3) {
        if(obj === arr[arr.length - 1]){fill(0);}
        if(obj === arr[arr.length - 2]){fill(0, 2, 0);}
        if(obj === arr[arr.length - 3]){fill(0, 4, 0);}
        if(obj === arr[arr.length - 4]){fill(0, 6, 1);}
        if(obj === arr[arr.length - 5]){fill(0, 12, 2);}
        if(obj === arr[arr.length - 6]){fill(1, 19, 3);}
        if(obj === arr[arr.length - 7]){fill(3, 39, 7);}
        if(obj === arr[arr.length - 8]){fill(4, 58, 11);}
        if(obj === arr[arr.length - 9]){fill(6, 78, 15);}
        if(obj === arr[arr.length - 10]){fill(8, 98, 19);}  
    }
}
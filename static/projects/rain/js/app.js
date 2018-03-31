var drops = [];
var drop = {};
var x, y, z, length;
function createDrops() {
    for(i = 0; i < 450; i++) {
        drop.x = randint(0, window.innerWidth);
        drop.y = randint(-window.innerHeight, 0);
        drop.z = randint(1, 100);
        drop.length = randint(50, 150) / drop.z;
        
        drops.push({...drop});
    }
}

createDrops();

function makeItRain() {
    for(i = 0; i < drops.length; i++) {
        stroke(drops[i].z / 2);
        strokeWeight(drops[i].z / 33);
        line(drops[i].x, drops[i].y, drops[i].x, drops[i].y + drops[i].length);
        drops[i].y += 20 - (drops[i].z / 20);
        
        if(drops[i].y > window.innerHeight) {
            drops[i].y = randint(-window.innerHeight, 0);
            splash(drops[i]);
        }
    }
}
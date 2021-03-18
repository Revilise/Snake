const canvas = document.getElementById('snake-frame');
const ctx = canvas.getContext('2d');
const barry = canvas.getContext('2d');

ctx.fillStyle = 'rgb(23, 184, 31)';
ctx.rect(200, 200, 16, 16);
ctx.fill();

function filling(x, y) {
    ctx.fillRect(x, y, 16, 16);
}
function clearing(x,y) {
    ctx.clearRect(x, y, 16, 16);
}
var x = 200, y = 200;
var dx = 0, dy = 0;
var bx, by;

var tail = [];

function spawn() {
    while (bx % 4 != 0) {
        bx = Math.floor(Math.random() * 400);
    }
    while (by % 4 != 0) {
        by = Math.floor(Math.random() * 400);
    }
    //barry.fillStyle = 'rgb(236, 78, 32)'
    barry.fillRect(bx, by, 8, 8);
}spawn();

// barry.fillStyle = 'rgb(236, 78, 32)'
// barry.rect(bx,by,16,16);
// barry.fill();

let time = setInterval(function() {
    //очистка предыдущего квадрата
    clearing(x, y)

    //движение змейки по х
    if (x > 400) {x = 0}
    if (x < 0) {x = 400}
    x +=dx;

    // движение змейки по y
    if (y > 400) {y = 0}
    if (y < 0) {y = 400}
    y +=dy;
    alert(bx);

    // заполнение нового квадрата
    filling(x, y, 16, 16);

    addEventListener('keydown', function(event) {
            if (event.code == "ArrowUp") {
                dy = -16
                dx = 0
            } else if (event.code == "ArrowDown") {
                dy = 16
                dx = 0
            } else if (event.code == "ArrowRight") {
                dx  = 16
                dy = 0
            } else if (event.code == "ArrowLeft") {
                dx = -16
                dy = 0
            }
        });
},150);

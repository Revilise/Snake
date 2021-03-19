const canvas = document.getElementById('snake-frame');
const ctx = canvas.getContext('2d');
const barry = canvas.getContext('2d');
var scoreContain = document.getElementById('score');
//ctx.fillStyle = 'rgb(23, 184, 31)';
//ctx.rect(200, 200, 16, 16);
//ctx.fill();

function filling(x, y) {
    ctx.fillRect(x, y, 16, 16);
}
function clearing(x,y) {
    ctx.clearRect(x, y, 16, 16);
}
var x = 208, y = 208;
var dx = 0, dy = 0;
var bx, by;
var score = 0;

var tail = [];

function spawn() {
    bx = Math.floor(Math.random() * 400);
    while (bx % 16 != 0) {
        bx = Math.floor(Math.random() * 400);
    }

    by = Math.floor(Math.random() * 400);
    while (by % 16 != 0) {
        by = Math.floor(Math.random() * 400);
    }

    barry.fillRect(bx, by, 16, 16);
} spawn();

let time = setInterval(function() {

    if (x == bx && y == by) {
        scoreContain.innerText = ++score;
        spawn();
    }
    //очистка предыдущего квадрата
    clearing(x, y);

    //движение змейки по х
    if (x > 400) {x = 0}
    if (x < 0) {x = 400}
    x +=dx;

    // движение змейки по y
    if (y > 400) {y = 0}
    if (y < 0) {y = 400}
    y +=dy;

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

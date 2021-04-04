const canvas = document.getElementById('snake-frame');
var scoreContain = document.getElementById('score');
const ctx = canvas.getContext('2d');

var score, count, snake, barry;
var grid = 16;
function reset() {
    frame = {
        width: 400,
        height: 400
    }
    barry = {
        x: 320,
        y: 320
    }
    snake = {
        x: 208,
        y: 208,
        dx: 0,
        dy: 0,
        tail: [
            {x: 208, y: 224},
            {x: 208, y: 240},
        ],
        maxtail: 2
    }
    score = 0;
} reset();

function spawn() {
    barry.x = Math.floor(Math.random() * 400);
    while (barry.x % 16 != 0) {
        barry.x = Math.floor(Math.random() * 400);
    }

    barry.y = Math.floor(Math.random() * 400);
    while (barry.y % 16 != 0) {
        barry.y = Math.floor(Math.random() * 400);
    }
}

var loop = setInterval(function() {
    scoreContain.innerText = score;
    ctx.clearRect(0,0, frame.width, frame.height);

    snake.x += snake.dx;
    snake.y += snake.dy;

    if (snake.x == frame.width) {
        snake.x = 0;
    } else if (snake.x < 0) {
        snake.x = frame.width;
    }

    if (snake.y == frame.height) {
        snake.y = 0;
    } else if (snake.y < 0) {
        snake.y = frame.height;
    }

    // добавить в массив текущую координату головы змейки
    snake.tail.unshift({
        x: snake.x,
        y: snake.y
    });
    // если длина змейки больше максимально возможной,
    // удалять последний элемент в массиве
    if (snake.tail.length > snake.maxtail) {
        snake.tail.pop();
    }

    // отрисовывать ягоду
    ctx.fillStyle = 'red',
    ctx.fillRect(barry.x, barry.y, grid, grid);

    // отрисовывать змейку
    ctx.fillStyle = 'green'
    // обработка каждовго элемента в массиве хвоста
    snake.tail.forEach(function(tail){
        ctx.fillRect(tail.x, tail.y, grid, grid);
    })
    if (snake.x == barry.x && snake.y == barry.y) {
        score++;
        snake.maxtail++;
        spawn();
        fillRect(barry.x, barry.y, grid, grid);
    }


    addEventListener('keydown', function(event) {
        if (event.code == "ArrowUp") {
            snake.dy = -16
            snake.dx = 0
        } else if (event.code == "ArrowDown") {
            snake.dy = 16
            snake.dx = 0
        } else if (event.code == "ArrowRight") {
            snake.dx  = 16
            snake.dy = 0
        } else if (event.code == "ArrowLeft") {
            snake.dx = -16
            snake.dy = 0
        }for (let i = 0; i < snake.tail.length; i++) {

    }

    });
    if (snake.x == snake.tail[i].x && snake.y == snake.tail[i].y) {
        reset();
    }
},150);
const canvas = document.getElementById('snake-frame');
var scoreContain = document.getElementById('score');
const ctx = canvas.getContext('2d');

var grid = 16;
fps = 10;
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
        {x: 208, y: 208},
        {x: 208, y: 224}
    ],
    maxtail: 3
}

score = 0;

const bar = function barrySpawn() {
    barry.x = Math.floor(Math.random() * 400);
    while (barry.x % 16 != 0) {
        barry.x = Math.floor(Math.random() * 400);
    }

    barry.y = Math.floor(Math.random() * 400);
    while (barry.y % 16 != 0) {
        barry.y = Math.floor(Math.random() * 400);
    }
    ctx.fillStyle = 'Red'
    ctx.fillRect(barry.x, barry.y, grid, grid);
}
ctx.fillStyle = 'green'

snake.tail.forEach(function(tail){
    ctx.fillRect(tail.x, tail.y, grid, grid);
})

// Цикл игры.
function loop() {

    // Установка частоты кадров.
    setTimeout(function() {

        // Отложенный запуск игры.
        requestAnimationFrame(loop)

        // Очистить фрейм.
        ctx.clearRect(0,0, frame.width, frame.height)

        ctx.fillStyle = 'Red'
        ctx.fillRect(barry.x, barry.y, grid, grid);

        scoreContain.innerText = score

        // Движение головы змейки.
        snake.x += snake.dx
        snake.y += snake.dy

        // Проверка границ и телепорт змеюки в другой конец карты.
        if (snake.x == frame.width) {
            snake.x = 0
        } else if (snake.x < 0) {
            snake.x = frame.width
        }
        if (snake.y == frame.height) {
            snake.y = 0;
        } else if (snake.y < 0) {
            snake.y = frame.height
        }

        // Добавить змее в начало текущие координаты
        snake.tail.unshift({
            x: snake.x,
            y: snake.y
        });

        // Обрезать змею по последнему элементу, чтобы хвост фиксировался.
        if (snake.tail.length > snake.maxtail) {
            snake.tail.pop();
        }

        // Перебор змеи.
        snake.tail.forEach(function(tail, index){

            // Отрисовка змеюки.
            ctx.fillStyle = 'green'
            ctx.fillRect(tail.x, tail.y, grid, grid);

            if (snake.x === barry.x && snake.y === barry.y) {
                score++
                snake.maxtail++
                bar()
            }
            // Проверка на столкновение с самой собой.
            for (let i = index + 1; i < snake.tail.length; i++) {
                if (tail.x === snake.tail[i].x && tail.y === snake.tail[i].y) {
                    /// окончание игры ///
                    snake.x = 208
                    snake.y = 208
                    snake.tail = []
                    snake.dx = 0
                    snake.dy = 0
                    snake.maxtail = 2
                }
            }
        })

        // Читалка кнопок - управление змейкой.
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
            }
        })
    }, 1000 / fps)
}

// Запуск змейки.
requestAnimationFrame(loop)
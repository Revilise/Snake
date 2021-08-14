const canvas = document.getElementById("snake-frame");
var scoreContain = document.getElementById("score");
const ctx = canvas.getContext("2d");

const config = {
  grid: 16,
  fps: 10,
  frame: {
    width: 400,
    height: 400
  },
  barry: {
    x: 320,
    y: 320
  },
  snake: {
    x: 208,
    y: 208,
    dx: 0,
    dy: 0,
    tail: [],
    maxtail: 2
  },
  score: 0
};

function SnakeGame(config) {
  this.BarrySpawn = () => {
    this.barry.x = Math.floor(Math.random() * 400);
    while (this.barry.x % 16 != 0) {
      this.barry.x = Math.floor(Math.random() * 400);
    }
    this.barry.y = Math.floor(Math.random() * 400);
    while (this.barry.y % 16 != 0) {
      this.barry.y = Math.floor(Math.random() * 400);
    }

    this.BarryDraw();
  };

  this.BarryDraw = () => {
    ctx.fillStyle = "Red";
    ctx.fillRect(this.barry.x, this.barry.y, this.grid, this.grid);
  };

  this.SnakeMove = () => {
    // Движение головы змейки.
    this.snake.x += this.snake.dx;
    this.snake.y += this.snake.dy;

    // Добавить в начало хвоста координату головы
    this.snake.tail.unshift({
      x: this.snake.x,
      y: this.snake.y
    });

    this.FrameTeleport();

    // Обрезать змею по последнему элементу, чтобы хвост фиксировался.
    if (this.snake.tail.length > this.snake.maxtail) {
      this.snake.tail.pop();
    }

    //Перебор змейки
    this.snake.tail.forEach((tail, index) => {
      //Отрисовка тела
      ctx.fillStyle = "green";
      ctx.fillRect(tail.x, tail.y, this.grid, this.grid);

      this.EatBarry();

      // Проверка на столкновение змейки с самой собой.
      for (let i = index + 1; i < this.snake.tail.length; i++) {
        if (
          tail.x === this.snake.tail[i].x &&
          tail.y === this.snake.tail[i].y
        ) {
          this.ResetGame();
        }
      }
    });
  };

  this.EatBarry = () => {
    if (this.snake.x === this.barry.x && this.snake.y === this.barry.y) {
      this.score++;
      this.ChangeScore();

      this.snake.maxtail++;
      this.BarrySpawn();

      // сразу перекрасить змейку в родной цвет.
      ctx.fillStyle = "green";
    }
  };

  this.ChangeScore = () => {
    scoreContain.innerText = this.score;
  };

  this.ResetGame = () => {
    let configCopy = {
      ...config,
      frame: { ...config.frame },
      snake: { ...config.snake, tail: [...config.snake.tail] },
      barry: { ...config.barry }
    };

    this.grid = configCopy.grid;
    this.fps = configCopy.fps;
    this.frame = configCopy.frame;
    this.barry = configCopy.barry;
    this.snake = configCopy.snake;
    this.score = configCopy.score;
    this.ChangeScore();
  };

  this.ClearFrame = () => {
    ctx.clearRect(0, 0, this.frame.width, this.frame.height);
  };

  this.FrameTeleport = () => {
    if (this.snake.x == this.frame.width) {
      this.snake.x = 0;
    } else if (this.snake.x < 0) {
      this.snake.x = this.frame.width;
    }
    if (this.snake.y == this.frame.height) {
      this.snake.y = 0;
    } else if (this.snake.y < 0) {
      this.snake.y = this.frame.height;
    }
  };

  this.SnakeController = () => {
    document.addEventListener("keydown", event => {
      if (event.code == "ArrowUp") {
        this.snake.dy = -16;
        this.snake.dx = 0;
      } else if (event.code == "ArrowDown") {
        this.snake.dy = 16;
        this.snake.dx = 0;
      } else if (event.code == "ArrowRight") {
        this.snake.dx = 16;
        this.snake.dy = 0;
      } else if (event.code == "ArrowLeft") {
        this.snake.dx = -16;
        this.snake.dy = 0;
      }
    });
  };

  this.loop = () => {
    this.ClearFrame();
    this.BarryDraw();
    this.SnakeMove();

    setTimeout(() => {
      requestAnimationFrame(this.loop);
    }, 1000 / this.fps);
  };

  //entry point
  return () => {
    this.ResetGame();
    this.SnakeController();

    return requestAnimationFrame(this.loop);
  };
}

window.play = new SnakeGame(config);

play();

const gameBoard = document.getElementById("game-board");
const ctx = gameBoard.getContext("2d");
const scoreText = document.getElementById("score");
const resetBtn = document.getElementById("reset");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardbackground = "#ededed";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let Xvelocity = unitSize;
let Yvelocity = unitSize;
let foodX;
let foodY;
let score = 0;
let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: 0, y: 0 },
];
window.addEventListener("keydown", ChangeDirection);
resetBtn.addEventListener("click", resetGame);
gameStart();

function gameStart() {
  running = true;
  scoreText.getContext = score;
  createFood();
  drawFood();
  nextTick();
}
function nextTick() {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 100);
  } else {
    displayGameOver();
  }
}
function clearBoard() {
  ctx.fillStyle = boardbackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}
function createFood() {
  function randomfood(min, max) {
    const randNum =
      Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;

    return randNum;
  }
  foodX = randomfood(0, gameWidth - unitSize);
  foodY = randomfood(0, gameWidth - unitSize);
}
function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
}
function moveSnake() {
  const head = { x: snake[0].x + Xvelocity, y: snake[0].y + Yvelocity };
  snake.unshift(head);
  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    scoreText.textContent = score;
    createFood();
  } else {
    snake.pop();
  }
}
function drawSnake() {
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  snake.forEach((snakePart) => {
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
}
function ChangeDirection(event) {
  const keypressed = event.keyCode;
  const left = 37;
  const right = 39;
  const down = 40;
  const up = 38;

  const goingup = Yvelocity == -unitSize;
  const goingdown = Yvelocity == unitSize;
  const goingleft = Xvelocity == -unitSize;
  const goingright = Xvelocity == unitSize;

  switch (true) {
    case keypressed == left && !goingright:
      Xvelocity = -unitSize;
      Yvelocity = 0;
      break;
    case keypressed == up && !goingdown:
      Yvelocity = -unitSize;
      Xvelocity = 0;
      break;
    case keypressed == right && !goingleft:
      Xvelocity = unitSize;
      Yvelocity = 0;
      break;
    case keypressed == down && !goingup:
      Yvelocity = unitSize;
      Xvelocity = 0;
      break;
  }
}
function checkGameOver() {
  switch (true) {
    case snake[0].x < 0:
      running = false;
      break;
    case snake[0].x >= gameWidth:
      running = false;
      break;
    case snake[0].y < 0:
      running = false;
      break;
    case snake[0].y >= gameHeight:
      running = false;
      break;
  }
  for (let i = 1; i < snake.length; i += 1) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false;
    }
  }
}
function displayGameOver() {
  ctx.font = "50px MV boli";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", gameWidth / 2, gameHeight / 2);
  running = false;
}
function resetGame() {
  score = 0;
  Xvelocity = unitSize;
  Yvelocity = unitSize;
  snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: 0, y: 0 },
  ];
  gameStart();
}

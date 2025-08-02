// Snake game for homepage with visible borders
const canvas = document.getElementById('snakeHomeCanvas');
const ctx = canvas.getContext('2d');
const grid = 20;
let snake = [{x: 200, y: 140}];
let dx = grid;
let dy = 0;
let food = {x: 100, y: 100};
let score = 0;
let gameOver = false;

function drawBorders() {
    ctx.strokeStyle = '#e91e63';
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, canvas.width-4, canvas.height-4);
}
function drawSnake() {
    ctx.fillStyle = '#4caf50';
    snake.forEach(part => ctx.fillRect(part.x, part.y, grid-2, grid-2));
}
function drawFood() {
    ctx.fillStyle = '#e91e63';
    ctx.fillRect(food.x, food.y, grid-2, grid-2);
}
function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        food.x = Math.floor(Math.random() * (canvas.width/grid)) * grid;
        food.y = Math.floor(Math.random() * (canvas.height/grid)) * grid;
    } else {
        snake.pop();
    }
}
function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) gameOver = true;
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) gameOver = true;
    }
}
function drawScore() {
    ctx.fillStyle = '#fff';
    ctx.font = '18px Arial';
    ctx.fillText('Score: ' + score, 20, 24);
}
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBorders();
    drawSnake();
    drawFood();
    drawScore();
    if (gameOver) {
        ctx.fillStyle = '#f44336';
        ctx.font = '32px Arial';
        ctx.fillText('Game Over!', 110, 150);
        return;
    }
    moveSnake();
    checkCollision();
    setTimeout(gameLoop, 120);
}
window.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' && dx === 0) { dx = -grid; dy = 0; }
    if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -grid; }
    if (e.key === 'ArrowRight' && dx === 0) { dx = grid; dy = 0; }
    if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = grid; }
});
gameLoop();

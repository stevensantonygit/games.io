// Snake game for games page with visible borders
const canvas = document.getElementById('snakeGamesCanvas');
const ctx = canvas.getContext('2d');
const grid = 20;
let snake = [{x: 200, y: 200}];
let dx = grid;
let dy = 0;
let food = {x: 400, y: 300};
let score = 0;
let gameOver = false;
function drawBorders() {
    ctx.strokeStyle = '#e91e63';
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, canvas.width-6, canvas.height-6);
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
        food.x = Math.floor(Math.random() * ((canvas.width-2*grid)/grid)) * grid + grid;
        food.y = Math.floor(Math.random() * ((canvas.height-2*grid)/grid)) * grid + grid;
    } else {
        snake.pop();
    }
}
function checkCollision() {
    const head = snake[0];
    if (head.x < grid || head.x >= canvas.width-grid || head.y < grid || head.y >= canvas.height-grid) gameOver = true;
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) gameOver = true;
    }
}
function drawScore() {
    ctx.fillStyle = '#fff';
    ctx.font = '28px Arial';
    ctx.fillText('Score: ' + score, 30, 50);
}
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBorders();
    drawSnake();
    drawFood();
    drawScore();
    if (gameOver) {
        ctx.fillStyle = '#f44336';
        ctx.font = '60px Arial';
        ctx.fillText('Game Over!', canvas.width/2-180, canvas.height/2);
        return;
    }
    moveSnake();
    checkCollision();
    setTimeout(gameLoop, 90);
}
window.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft' && dx === 0) { dx = -grid; dy = 0; }
    if (e.key === 'ArrowUp' && dy === 0) { dx = 0; dy = -grid; }
    if (e.key === 'ArrowRight' && dx === 0) { dx = grid; dy = 0; }
    if (e.key === 'ArrowDown' && dy === 0) { dx = 0; dy = grid; }
});
gameLoop();

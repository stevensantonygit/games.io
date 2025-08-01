const canvas = document.getElementById('flappyCanvas');
const ctx = canvas.getContext('2d');
let bird = {x: 100, y: 300, r: 20, vy: 0};
let pipes = [];
let score = 0;
let gameOver = false;
function spawnPipe() {
    let gap = 230;
    let top = Math.random() * (canvas.height - gap - 80) + 40;
    pipes.push({x: canvas.width, top: top, bottom: top + gap});
}
function drawBird() {
    ctx.fillStyle = '#ffd600';
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.r, 0, Math.PI*2);
    ctx.fill();
}
function drawPipes() {
    ctx.fillStyle = '#4caf50';
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, 60, pipe.top);
        ctx.fillRect(pipe.x, pipe.bottom, 60, canvas.height-pipe.bottom);
    });
}
function drawBorders() {
    ctx.strokeStyle = '#4caf50';
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, canvas.width-6, canvas.height-6);
}
function drawScore() {
    ctx.fillStyle = '#fff';
    ctx.font = '32px Arial';
    ctx.fillText('Score: ' + score, 30, 50);
}
function update() {
    bird.vy += 0.22;
    bird.y += bird.vy;
    pipes.forEach(pipe => pipe.x -= 1.3);
    if (pipes.length === 0 || pipes[pipes.length-1].x < canvas.width-500) spawnPipe();
    if (pipes.length && pipes[0].x < -60) pipes.shift();
    pipes.forEach(pipe => {
        if (bird.x+bird.r > pipe.x && bird.x-bird.r < pipe.x+60) {
            if (bird.y-bird.r < pipe.top || bird.y+bird.r > pipe.bottom) {
                gameOver = true;
            }
        }
    });
    if (bird.y-bird.r < 6 || bird.y+bird.r > canvas.height-6) {
        gameOver = true;
    }
    if (!gameOver) score++;
}
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBorders();
    drawBird();
    drawPipes();
    drawScore();
    if (gameOver) {
        ctx.fillStyle = '#f44336';
        ctx.font = '60px Arial';
        ctx.fillText('Game Over!', canvas.width/2-180, canvas.height/2);
    }
}
function loop() {
    update();
    draw();
    if (!gameOver) requestAnimationFrame(loop);
}
window.addEventListener('keydown', e => {
    if (e.code === 'Space' && !gameOver) bird.vy = -8;
});
loop();

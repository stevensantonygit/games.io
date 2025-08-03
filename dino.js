const canvas = document.getElementById('dinoCanvas');
const ctx = canvas.getContext('2d');
let dino = {x: 80, y: 220, w: 40, h: 60, vy: 0, jumping: false};
let obstacles = [];
let score = 0;
let gameOver = false;
function spawnObstacle() {
    let h = 40 + Math.random()*40;
    let last = obstacles.length ? obstacles[obstacles.length-1].x : 0;
    let minSpace = 260;
    if (last < canvas.width-minSpace) {
        obstacles.push({x: canvas.width, y: canvas.height-h-6, w: 30+Math.random()*30, h: h});
    }
}
function drawDino() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(dino.x, dino.y, dino.w, dino.h);
}
function drawObstacles() {
    ctx.fillStyle = '#e91e63';
    obstacles.forEach(o => ctx.fillRect(o.x, o.y, o.w, o.h));
}
function drawBorders() {
    ctx.strokeStyle = '#e91e63';
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, canvas.width-6, canvas.height-6);
}
function drawScore() {
    ctx.fillStyle = '#fff';
    ctx.font = '32px Arial';
    ctx.fillText('Score: ' + score, 30, 50);
}
function update() {
    if (Math.random() < 0.02) spawnObstacle();
    obstacles.forEach(o => o.x -= 8);
    if (obstacles.length && obstacles[0].x < -60) obstacles.shift();
    if (dino.jumping) {
        dino.vy += 1.2;
        dino.y += dino.vy;
        if (dino.y >= 220) { dino.y = 220; dino.vy = 0; dino.jumping = false; }
    }
    obstacles.forEach(o => {
        if (dino.x+dino.w > o.x && dino.x < o.x+o.w && dino.y+dino.h > o.y) gameOver = true;
    });
    if (!gameOver) score++;
}
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBorders();
    drawDino();
    drawObstacles();
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
    if (e.code === 'Space' && !dino.jumping && !gameOver) {
        dino.jumping = true;
        dino.vy = -18;
    }
});
loop();

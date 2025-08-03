const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
let paddle1 = {x: 20, y: canvas.height/2-60, w: 16, h: 120, dy: 0};
let paddle2 = {x: canvas.width-36, y: canvas.height/2-60, w: 16, h: 120, dy: 0};
let ball = {x: canvas.width/2, y: canvas.height/2, r: 14, dx: 6, dy: 6};
let score1 = 0, score2 = 0;
function drawNet() {
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;
    for(let y=0; y<canvas.height; y+=40){
        ctx.beginPath();
        ctx.moveTo(canvas.width/2, y);
        ctx.lineTo(canvas.width/2, y+20);
        ctx.stroke();
    }
}
function drawBorders() {
    ctx.strokeStyle = '#e91e63';
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, canvas.width-6, canvas.height-6);
}
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBorders();
    drawNet();
    ctx.fillStyle = '#fff';
    ctx.fillRect(paddle1.x, paddle1.y, paddle1.w, paddle1.h);
    ctx.fillRect(paddle2.x, paddle2.y, paddle2.w, paddle2.h);
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI*2);
    ctx.fillStyle = '#e91e63';
    ctx.fill();
    ctx.font = '32px Arial';
    ctx.fillText(score1, canvas.width/2-60, 50);
    ctx.fillText(score2, canvas.width/2+30, 50);
}
function move() {
    paddle1.y += paddle1.dy;
    paddle2.y += paddle2.dy;
    paddle1.y = Math.max(6, Math.min(canvas.height-paddle1.h-6, paddle1.y));
    paddle2.y = Math.max(6, Math.min(canvas.height-paddle2.h-6, paddle2.y));
    ball.x += ball.dx;
    ball.y += ball.dy;
    if (ball.y < ball.r+6 || ball.y > canvas.height-ball.r-6) ball.dy *= -1;
    if (ball.x-ball.r < paddle1.x+paddle1.w && ball.y > paddle1.y && ball.y < paddle1.y+paddle1.h) ball.dx *= -1;
    if (ball.x+ball.r > paddle2.x && ball.y > paddle2.y && ball.y < paddle2.y+paddle2.h) ball.dx *= -1;
    if (ball.x < 0) { score2++; resetBall(-1); }
    if (ball.x > canvas.width) { score1++; resetBall(1); }
}
function resetBall(dir) {
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.dx = 6 * dir;
    ball.dy = 6 * (Math.random() > 0.5 ? 1 : -1);
}
function ai() {
    let target = ball.y - paddle2.h/2;
    if (Math.abs(target - paddle2.y) > 10) {
        paddle2.dy = target > paddle2.y ? 5 : -5;
    } else {
        paddle2.dy = 0;
    }
}
function loop() {
    draw();
    move();
    ai();
    requestAnimationFrame(loop);
}
window.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp') paddle1.dy = -8;
    if (e.key === 'ArrowDown') paddle1.dy = 8;
});
window.addEventListener('keyup', e => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') paddle1.dy = 0;
});
loop();

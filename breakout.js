const canvas = document.getElementById('breakoutCanvas');
const ctx = canvas.getContext('2d');
let paddle = {x: canvas.width/2-50, y: canvas.height-30, w: 100, h: 16, dx: 0};
let ball = {x: canvas.width/2, y: canvas.height-50, r: 12, dx: 3, dy: -3};
let bricks = [];
let rows = 3, cols = 10;
paddle.w = 140;
let score = 0;
let gameOver = false;
for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
        bricks.push({x:60+c*60, y:40+r*30, w:50, h:20, hit:false});
    }
}
function drawBorders() {
    ctx.strokeStyle = '#e91e63';
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, canvas.width-6, canvas.height-6);
}
function drawBricks() {
    bricks.forEach(b=>{
        if(!b.hit){
            ctx.fillStyle = '#ffd600';
            ctx.fillRect(b.x,b.y,b.w,b.h);
        }
    });
}
function drawPaddle() {
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(paddle.x,paddle.y,paddle.w,paddle.h);
}
function drawBall() {
    ctx.fillStyle = '#e91e63';
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2);
    ctx.fill();
}
function drawScore() {
    ctx.fillStyle = '#fff';
    ctx.font = '32px Arial';
    ctx.fillText('Score: '+score,30,50);
}
function update() {
    paddle.x += paddle.dx;
    paddle.x = Math.max(6,Math.min(canvas.width-paddle.w-6,paddle.x));
    ball.x += ball.dx;
    ball.y += ball.dy;
    if(ball.x-ball.r<6||ball.x+ball.r>canvas.width-6) ball.dx*=-1;
    if(ball.y-ball.r<6) ball.dy*=-1;
    if(ball.y+ball.r>canvas.height-6) gameOver=true;
    if(ball.x>paddle.x&&ball.x<paddle.x+paddle.w&&ball.y+ball.r>paddle.y&&ball.y-ball.r<paddle.y+paddle.h) ball.dy=-Math.abs(ball.dy);
    bricks.forEach(b=>{
        if(!b.hit&&ball.x>b.x&&ball.x<b.x+b.w&&ball.y-ball.r<b.y+b.h&&ball.y+ball.r>b.y){
            b.hit=true; ball.dy*=-1; score+=10;
        }
    });
}
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBorders();
    drawBricks();
    drawPaddle();
    drawBall();
    drawScore();
    if(gameOver){
        ctx.fillStyle = '#f44336';
        ctx.font = '60px Arial';
        ctx.fillText('Game Over!',canvas.width/2-180,canvas.height/2);
    }
}
function loop() {
    update();
    draw();
    if(!gameOver) requestAnimationFrame(loop);
}
window.addEventListener('keydown',e=>{
    if(e.key==='ArrowLeft') paddle.dx=-8;
    if(e.key==='ArrowRight') paddle.dx=8;
});
window.addEventListener('keyup',e=>{
    if(e.key==='ArrowLeft'||e.key==='ArrowRight') paddle.dx=0;
});
loop();

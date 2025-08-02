const canvas = document.getElementById('whackCanvas');
const ctx = canvas.getContext('2d');
let holes = [];
let moles = [];
let score = 0;
let gameOver = false;
let time = 30;
for(let r=0;r<2;r++){
    for(let c=0;c<5;c++){
        holes.push({x:80+c*100, y:100+r*120});
    }
}
function drawBorders() {
    ctx.strokeStyle = '#4caf50';
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, canvas.width-6, canvas.height-6);
}
function drawHoles() {
    holes.forEach(h=>{
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(h.x,h.y,40,0,Math.PI*2);
        ctx.fill();
    });
}
function drawMoles() {
    moles.forEach(m=>{
        ctx.fillStyle = '#e91e63';
        ctx.beginPath();
        ctx.arc(m.x,m.y,30,0,Math.PI*2);
        ctx.fill();
    });
}
function drawScore() {
    ctx.fillStyle = '#fff';
    ctx.font = '32px Arial';
    ctx.fillText('Score: '+score,30,50);
    ctx.fillText('Time: '+time,450,50);
}
function update() {
    if(Math.random()<0.04 && moles.length<2){
        let idx = Math.floor(Math.random()*holes.length);
        if(!moles.some(m=>m.x===holes[idx].x&&m.y===holes[idx].y))
            moles.push({x:holes[idx].x,y:holes[idx].y});
    }
    if(time>0 && !gameOver){
        time -= 0.03;
        if(time<=0){gameOver=true;}
    }
}
function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBorders();
    drawHoles();
    drawMoles();
    drawScore();
    if(gameOver){
        ctx.fillStyle = '#4caf50';
        ctx.font = '60px Arial';
        ctx.fillText('Game Over!',canvas.width/2-180,canvas.height/2);
    }
}
canvas.addEventListener('mousedown',e=>{
    if(gameOver) return;
    let rect = canvas.getBoundingClientRect();
    let mx = e.clientX-rect.left;
    let my = e.clientY-rect.top;
    for(let i=moles.length-1;i>=0;i--){
        let m=moles[i];
        if(Math.hypot(mx-m.x,my-m.y)<30){
            score+=10;
            moles.splice(i,1);
        }
    }
});
function loop(){
    update();
    draw();
    requestAnimationFrame(loop);
}
loop();

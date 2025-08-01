const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: 400,
    y: 500,
    width: 40,
    height: 80,
    color: '#4caf50',
    speed: 5,
    direction: 0
};
let aiCars = [];
let paths = [200, 400, 600];
let score = 0;
let gameOver = false;

function drawPlayer() {
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.beginPath();
    ctx.moveTo(-player.width/2, player.height/2-10);
    ctx.lineTo(-player.width/2+8, -player.height/2+10);
    ctx.lineTo(0, -player.height/2);
    ctx.lineTo(player.width/2-8, -player.height/2+10);
    ctx.lineTo(player.width/2, player.height/2-10);
    ctx.closePath();
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-player.width/2+10, -player.height/2+10);
    ctx.lineTo(0, -player.height/2+18);
    ctx.lineTo(player.width/2-10, -player.height/2+10);
    ctx.closePath();
    ctx.fillStyle = '#222';
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-player.width/2+14, -player.height/2+14);
    ctx.lineTo(0, -player.height/2+22);
    ctx.lineTo(player.width/2-14, -player.height/2+14);
    ctx.closePath();
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(-player.width/2+10, player.height/2-6, 7, 0, Math.PI*2);
    ctx.arc(player.width/2-10, player.height/2-6, 7, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#ffd600';
    ctx.beginPath();
    ctx.arc(-player.width/2+12, -player.height/2+6, 3, 0, Math.PI*2);
    ctx.arc(player.width/2-12, -player.height/2+6, 3, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
}

function drawAICars() {
    aiCars.forEach(car => {
        ctx.save();
        ctx.translate(car.x, car.y);
        ctx.fillStyle = car.color;
        ctx.fillRect(-car.width/2, -car.height/2, car.width, car.height);
        ctx.fillStyle = '#222';
        ctx.fillRect(-car.width/2, -car.height/2, car.width, 18);
        ctx.fillStyle = '#fff';
        ctx.fillRect(-car.width/2+6, -car.height/2+4, car.width-12, 10);
        ctx.fillStyle = '#333';
        ctx.fillRect(-car.width/2, car.height/2-10, 12, 10);
        ctx.fillRect(car.width/2-12, car.height/2-10, 12, 10);
        ctx.restore();
    });
}

function spawnAICar() {
    const lane = paths[Math.floor(Math.random() * paths.length)];
    aiCars.push({
        x: lane,
        y: -80,
        width: 40,
        height: 80,
        color: '#e91e63',
        speed: 4 + Math.random() * 2
    });
}

function updateAICars() {
    aiCars.forEach(car => {
        car.y += car.speed;
    });
    aiCars = aiCars.filter(car => car.y < canvas.height + 80);
}

function checkCollisions() {
    aiCars.forEach(car => {
        if (
            Math.abs(player.x - car.x) < (player.width + car.width)/2 &&
            Math.abs(player.y - car.y) < (player.height + car.height)/2
        ) {
            gameOver = true;
        }
    });
}

function drawPaths() {
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;
    paths.forEach(x => {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    });
}

function drawScore() {
    ctx.fillStyle = '#fff';
    ctx.font = '24px Arial';
    ctx.fillText('Score: ' + score, 20, 40);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaths();
    drawPlayer();
    drawAICars();
    drawScore();
    if (gameOver) {
        ctx.fillStyle = '#f44336';
        ctx.font = '48px Arial';
        ctx.fillText('Game Over!', 280, 300);
        return;
    }
    updateAICars();
    checkCollisions();
    score++;
    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
        let idx = paths.indexOf(player.x);
        if (idx > 0) player.x = paths[idx - 1];
    }
    if (e.key === 'ArrowRight') {
        let idx = paths.indexOf(player.x);
        if (idx < paths.length - 1) player.x = paths[idx + 1];
    }
});

setInterval(() => {
    if (!gameOver) spawnAICar();
}, 900);

gameLoop();

const canvas = document.getElementById('tictactoeCanvas');
const ctx = canvas.getContext('2d');
let board = Array(9).fill(null);
let current = 'X';
let gameOver = false;
function drawBoard() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = '#4caf50';
    ctx.lineWidth = 6;
    for(let i=1;i<3;i++){
        ctx.beginPath();
        ctx.moveTo(i*canvas.width/3,0);
        ctx.lineTo(i*canvas.width/3,canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0,i*canvas.height/3);
        ctx.lineTo(canvas.width,i*canvas.height/3);
        ctx.stroke();
    }
    for(let i=0;i<9;i++){
        let x = (i%3)*canvas.width/3+canvas.width/6;
        let y = Math.floor(i/3)*canvas.height/3+canvas.height/6;
        ctx.font = '80px Arial';
        ctx.fillStyle = board[i]==='X'?'#e91e63':'#ffd600';
        if(board[i]) ctx.fillText(board[i],x-30,y+30);
    }
}
function checkWin() {
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    for(let w of wins){
        if(board[w[0]]&&board[w[0]]===board[w[1]]&&board[w[1]]===board[w[2]]) return board[w[0]];
    }
    return board.every(x=>x)?'Draw':null;
}
canvas.addEventListener('click',e=>{
    if(gameOver) return;
    let x = Math.floor(e.offsetX/(canvas.width/3));
    let y = Math.floor(e.offsetY/(canvas.height/3));
    let idx = y*3+x;
    if(!board[idx]){
        board[idx]=current;
        let win=checkWin();
        if(win){
            gameOver=true;
            setTimeout(()=>{alert(win==='Draw'?'Draw!':win+' wins!');},100);
        }
        current=current==='X'?'O':'X';
    }
    drawBoard();
});
drawBoard();

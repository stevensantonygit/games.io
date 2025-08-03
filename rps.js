// Rock, Paper, Scissors Game
const canvas = document.getElementById('rpsCanvas');
const ctx = canvas.getContext('2d');
let playerChoice = '', computerChoice = '', result = '';
function drawRPS() {
    ctx.clearRect(0,0,400,220);
    ctx.font = '32px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffd600';
    ctx.fillText('You: ' + (playerChoice ? emoji(playerChoice) : '❔'), 120, 100);
    ctx.fillStyle = '#4caf50';
    ctx.fillText('CPU: ' + (computerChoice ? emoji(computerChoice) : '❔'), 280, 100);
}
function emoji(choice) {
    if(choice==='rock') return '🪨';
    if(choice==='paper') return '📄';
    if(choice==='scissors') return '✂️';
    return '❔';
}
function playRPS(choice) {
    playerChoice = choice;
    const options = ['rock','paper','scissors'];
    computerChoice = options[Math.floor(Math.random()*3)];
    if(playerChoice===computerChoice) result = "It's a draw!";
    else if((playerChoice==='rock'&&computerChoice==='scissors')||
            (playerChoice==='paper'&&computerChoice==='rock')||
            (playerChoice==='scissors'&&computerChoice==='paper'))
        result = 'You win!';
    else result = 'You lose!';
    drawRPS();
    document.getElementById('rpsResult').textContent = result;
}
window.onload = () => { drawRPS(); document.getElementById('rpsResult').textContent = ''; };

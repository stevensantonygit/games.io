// Simple Memory Match Game for homepage
const gameContainer = document.getElementById('memoryGame');
const emojis = ['🚗','🚗','🐍','🐍','🏓','🏓','🍕','🍕','🎮','🎮','🌟','🌟'];
let shuffled = emojis.sort(() => 0.5 - Math.random());
let cards = [];
let first = null, second = null, lock = false, matches = 0;

function render() {
    gameContainer.innerHTML = '';
    // Draw border
    gameContainer.style.border = '6px solid #4caf50';
    gameContainer.style.borderRadius = '16px';
    gameContainer.style.background = '#222';
    gameContainer.style.padding = '24px';
    gameContainer.style.display = 'inline-block';
    gameContainer.style.minWidth = '340px';
    gameContainer.style.boxShadow = '0 2px 12px #0005';
    let grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(6, 64px)';
    grid.style.gridGap = '12px';
    grid.style.justifyContent = 'center';
    shuffled.forEach((emoji, i) => {
        let card = document.createElement('button');
        card.className = 'memory-card';
        card.style.width = '60px';
        card.style.height = '60px';
        card.style.fontSize = '2em';
        card.style.background = '#333';
        card.style.border = '3px solid #e91e63';
        card.style.borderRadius = '10px';
        card.style.cursor = 'pointer';
        card.style.transition = 'background 0.2s';
        card.textContent = cards[i] ? emoji : '';
        card.disabled = cards[i] || lock;
        card.onclick = () => flip(i, card);
        grid.appendChild(card);
    });
    gameContainer.appendChild(grid);
}
function flip(i, card) {
    if (lock || cards[i]) return;
    card.textContent = shuffled[i];
    if (first === null) {
        first = i;
    } else if (second === null && i !== first) {
        second = i;
        lock = true;
        setTimeout(() => {
            if (shuffled[first] === shuffled[second]) {
                cards[first] = true;
                cards[second] = true;
                matches++;
                if (matches === emojis.length/2) {
                    gameContainer.innerHTML = '<div style="color:#4caf50; font-size:2em; margin:30px; border:6px solid #4caf50; border-radius:16px; background:#222; padding:30px;">You Win! 🎉</div>';
                    return;
                }
            } else {
                document.querySelectorAll('.memory-card')[first].textContent = '';
                document.querySelectorAll('.memory-card')[second].textContent = '';
            }
            first = null; second = null; lock = false; render();
        }, 900);
    }
}
render();

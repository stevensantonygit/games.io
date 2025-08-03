// Emoji Guessing Game
const clues = [
  {emoji: '🔥👨', answer: 'fireman'},
  {emoji: '🦄🌈', answer: 'unicorn'},
  {emoji: '🍎📱', answer: 'apple'},
  {emoji: '🌊🏄', answer: 'wave'},
  {emoji: '🐝🍯', answer: 'beehive'},
  {emoji: '🌞👓', answer: 'sunglasses'},
  {emoji: '🎸👦', answer: 'rockstar'},
  {emoji: '🦁👑', answer: 'lionking'},
  {emoji: '🍕🚗', answer: 'pizzacar'},
  {emoji: '🦆👟', answer: 'duckfeet'}
];
let current = 0;
function showEmojiClue() {
  document.getElementById('emoji-clue').textContent = clues[current].emoji;
  document.getElementById('emoji-guess').value = '';
  document.getElementById('emoji-result').textContent = '';
}
function submitEmojiGuess() {
  const guess = document.getElementById('emoji-guess').value.trim().toLowerCase();
  if (!guess) return;
  if (guess === clues[current].answer) {
    document.getElementById('emoji-result').textContent = '✅ Correct!';
  } else {
    document.getElementById('emoji-result').textContent = '❌ Try again!';
  }
}
function nextEmoji() {
  current = (current + 1) % clues.length;
  showEmojiClue();
}
window.onload = showEmojiClue;

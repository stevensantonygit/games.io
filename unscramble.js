const words = ['banana','computer','guitar','window','puzzle','rocket','garden','school','friend','holiday'];
let current = 0;
function scramble(word) {
  return word.split('').sort(()=>Math.random()-0.5).join('');
}
function showScrambledWord() {
  document.getElementById('scrambled-word').textContent = scramble(words[current]);
  document.getElementById('unscramble-guess').value = '';
  document.getElementById('unscramble-result').textContent = '';
}
function submitUnscramble() {
  const guess = document.getElementById('unscramble-guess').value.trim().toLowerCase();
  if (!guess) return;
  if (guess === words[current]) {
    document.getElementById('unscramble-result').textContent = '✅ Correct!';
  } else {
    document.getElementById('unscramble-result').textContent = '❌ Try again!';
  }
}
function nextUnscramble() {
  current = (current + 1) % words.length;
  showScrambledWord();
}
window.onload = showScrambledWord;

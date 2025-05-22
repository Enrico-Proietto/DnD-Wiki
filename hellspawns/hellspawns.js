setInterval(() => {
    const ember = document.createElement('div');
    ember.className = 'ember';
    ember.style.left = Math.random() * window.innerWidth + 'px';
    ember.style.top = '0px';
    document.body.appendChild(ember);
    setTimeout(() => ember.remove(), 3000);
}, 100);

const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ',]; // Elder Futhark symbols
setInterval(() => {
  const rune = document.createElement('div');
  rune.className = 'rune';
  rune.textContent = runes[Math.floor(Math.random() * runes.length)];
  rune.style.left = Math.random() * window.innerWidth + 'px';
  rune.style.top = Math.random() * window.innerHeight + 'px';

  const runeTwo = document.createElement('div');
  runeTwo.className = 'rune';
  runeTwo.textContent = runes[Math.floor(Math.random() * runes.length)];
  runeTwo.style.left = Math.random() * window.innerWidth + 'px';
  runeTwo.style.top = Math.random() * window.innerHeight + 'px';

  const runeThree = document.createElement('div');
  runeThree.className = 'rune';
  runeThree.textContent = runes[Math.floor(Math.random() * runes.length)];
  runeThree.style.left = Math.random() * window.innerWidth + 'px';
  runeThree.style.top = Math.random() * window.innerHeight + 'px';

  const runeFour = document.createElement('div');
  runeFour.className = 'rune';
  runeFour.textContent = runes[Math.floor(Math.random() * runes.length)];
  runeFour.style.left = Math.random() * window.innerWidth + 'px';
  runeFour.style.top = Math.random() * window.innerHeight + 'px';

  document.body.appendChild(rune);
  document.body.appendChild(runeTwo);
  document.body.appendChild(runeThree);
  document.body.appendChild(runeFour);

  setTimeout(() => {
    rune.remove();
    runeTwo.remove();
  }, 3000);
}, 4000);
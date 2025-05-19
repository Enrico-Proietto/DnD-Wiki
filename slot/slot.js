const symbols = ["🗡️", "🧪", "🐉", "📜", "🎲", "🧙", "🛡️", "👑"];
const reels = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3"),
  document.getElementById("reel4"),
  document.getElementById("reel5")
];
const resultText = document.getElementById("result");
const handle = document.getElementById("handle");

function spinAnimation(reel, delay) {
  return new Promise(resolve => {
    let spins = 20 + Math.floor(Math.random() * 10);
    let i = 0;
    const interval = setInterval(() => {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      reel.textContent = symbol;
      i++;
      if (i >= spins) {
        clearInterval(interval);
        resolve(symbol);
      }
    }, delay);
  });
}

async function pullHandle() {
  if (handle.classList.contains('spinning')) return;
  handle.classList.add('spinning');
  resultText.textContent = 'Rolling...';

  const finalSymbols = await Promise.all([
    spinAnimation(reels[0], 50),
    spinAnimation(reels[1], 55),
    spinAnimation(reels[2], 60),
    spinAnimation(reels[3], 65),
    spinAnimation(reels[4], 70)
  ]);

  evaluateResult(finalSymbols);
  handle.classList.remove('spinning');
}

function evaluateResult(results) {
  const counts = {};
  results.forEach(s => counts[s] = (counts[s] || 0) + 1);
  const max = Math.max(...Object.values(counts));

  switch (max) {
    case 5:
      resultText.textContent = "🌟 Legendary Win! Five of a kind!";
      break;
    case 4:
      resultText.textContent = "🔥 Epic! Four symbols matched.";
      break;
    case 3:
      resultText.textContent = "⚔️ Not bad, three match.";
      break;
    case 2:
      resultText.textContent = "🧐 Two matched. Almost!";
      break;
    default:
      resultText.textContent = "💀 Miss! Fate was unkind.";
  }
}

handle.addEventListener('click', pullHandle);

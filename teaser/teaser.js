function chestClicked() {
  // Do nothing
  const msg = document.getElementById("chestMessage");
  msg.innerText = "Still sealed...";
}

// Set the countdown date (1.5 years from May 21, 2025)
const countdownDate = new Date("November 21, 2026 00:00:00").getTime();

const countdown = document.getElementById("countdown");

setInterval(() => {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance < 0) {
    countdown.innerHTML = "🔓 The seal is broken...";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  countdown.innerHTML = `
    Time remaining: ${days}d ${hours}h ${minutes}m ${seconds}s
  `;
}, 1000);

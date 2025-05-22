const background = document.getElementById("background");
const flash = document.getElementById("flash");
const bolt = document.getElementById("bolt");

setInterval(() => {
  const flash = document.getElementById("flash");
  flash.style.opacity = 1;
  setTimeout(() => flash.style.opacity = 0, 100);
}, 2000);

function createRain(count) {
  for (let i = 0; i < count; i++) {
    const drop = document.createElement("div");
    drop.classList.add("raindrop");
    drop.style.left = `${Math.random() * 100}vw`;
    drop.style.animationDuration = `${0.5 + Math.random()}s`;
    drop.style.animationDelay = `${Math.random() * 5}s`;
    background.appendChild(drop);
  }
}

function lightning() {
  const x = Math.random() * window.innerWidth;
  bolt.style.left = `${x}px`;
  flash.style.opacity = 1;
  bolt.style.opacity = 1;
  setTimeout(() => {
    flash.style.opacity = 0;
    bolt.style.opacity = 0;
  }, 100);
}

createRain(100);
setInterval(lightning, 8000 + Math.random() * 10000);
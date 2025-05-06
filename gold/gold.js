const goldContainer = document.getElementById('mainView');

function createCoin() {
  const coin = document.createElement('div');
  coin.classList.add('coin');
  coin.innerHTML = '<img src="/images/gold.png" alt="coin" />';
  coin.style.position = 'absolute';
  coin.style.top = Math.random() * window.innerHeight + 'px';
  coin.style.left = Math.random() * window.innerWidth + 'px';
  coin.style.animationDuration = (3 + Math.random() * 2) + 's';
  coin.style.zIndex = -3

  goldContainer.appendChild(coin);

  setTimeout(() => {
    goldContainer.removeChild(coin);
  }, 5000);
}

setInterval(createCoin, 10);
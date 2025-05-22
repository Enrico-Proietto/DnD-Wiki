document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelector('.stars');
  
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}vw`;
      star.style.bottom = `${Math.random() * 100}vh`;
      star.style.animationDuration = `${10 + Math.random() * 20}s`;
      star.style.animationDelay = `${Math.random() * 5}s`;
  
      stars.appendChild(star);
    }
  });
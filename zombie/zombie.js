for (let i = 0; i < 20; i++) {
    const fly = document.createElement('div');
    fly.className = 'fly';
    fly.style.left = Math.random() * window.innerWidth + 'px';
    fly.style.top = Math.random() * window.innerHeight + 'px';
    document.body.appendChild(fly);
}

// Random Handprint Smears
setInterval(() => {
    const smear = document.createElement('div');
    smear.className = 'handprint';
    smear.style.left = Math.random() * window.innerWidth + 'px';
    smear.style.top = Math.random() * window.innerHeight + 'px';
    document.body.appendChild(smear);
    setTimeout(() => smear.remove(), 4000);
}, 7000);

// Bubbles (green rot)
setInterval(() => {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.left = Math.random() * window.innerWidth + 'px';
    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 3000);
}, 400);

// Handprints
setInterval(() => {
    const smear = document.createElement('div');
    smear.className = 'handprint';
    smear.style.left = Math.random() * window.innerWidth + 'px';
    smear.style.top = Math.random() * window.innerHeight + 'px';
    document.body.appendChild(smear);
    setTimeout(() => smear.remove(), 4000);
}, 7000);
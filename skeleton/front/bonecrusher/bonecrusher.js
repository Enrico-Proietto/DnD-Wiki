for (let i = 0; i < 100; i++) {
    const dust = document.createElement('div');
    dust.className = 'dust';
    dust.style.left = Math.random() * window.innerWidth + 'px';
    dust.style.top = Math.random() * window.innerHeight + 'px';
    document.body.appendChild(dust);
}

// Rattling Sound on Hover
const creature = document.getElementById('creature');
const boneSound = document.getElementById('boneSound');
creature.addEventListener('mouseenter', () => {
    boneSound.currentTime = 0;
    boneSound.play();
});

// Bone Hand Clawing Out
setInterval(() => {
    const hand = document.createElement('div');
    hand.className = 'bone-hand';
    hand.style.left = Math.random() * (window.innerWidth - 80) + 'px';
    hand.style.bottom = '0px';
    document.body.appendChild(hand);
    setTimeout(() => hand.remove(), 4000);
}, 7000);
document.addEventListener('DOMContentLoaded', () => {
    const emberContainer = document.querySelector('.embers');

    for (let i = 0; i < 80; i++) {
        const ember = document.createElement('div');
        ember.classList.add('ember');

        ember.style.left = `${Math.random() * 100}vw`;
        ember.style.bottom = `${Math.random() * 100}vh`;
        ember.style.animationDuration = `${6 + Math.random() * 10}s`;
        ember.style.animationDelay = `${Math.random() * 10}s`;

        emberContainer.appendChild(ember);
    }
});

function getStripHTML(top, stripHeight) {
    const duration = random(5, 10);
    const name = `glitch-${duration}`;

    return `
      <div
        class="strip"
        style="height: ${stripHeight}px; background-position: 0 -${top}px;"
      ></div>`;
}

function getGlitchHTML(height) {
    let i = 0;
    const html = [];

    while (true) {
        const stripHeight = random(1, 6);

        if (i + stripHeight < height) {
            const strip = getStripHTML(i, stripHeight);
            html.push(strip);
        } else {
            const strip = getStripHTML(i, height - i); // last one fills remaining height
            html.push(strip);
            break;
        }

        i += stripHeight;
    }

    return html;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
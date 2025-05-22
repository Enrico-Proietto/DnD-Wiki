const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

const sparkColors = {
    divination: '#861fa5',
    back: '#9425c7',
};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const stars = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.5 + 0.3
}));

function draw() {
    const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width
    );
    gradient.addColorStop(0, "#2e1038");
    gradient.addColorStop(0.5, "#1b0a23");
    gradient.addColorStop(1, "#0a040e");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
        ctx.fill();
    });

    requestAnimationFrame(draw);
}

draw();

function createSpellCard(spell) {
    const card = document.createElement('div');
    card.className = 'flip-card';

    card.innerHTML = `
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <h3>${spell.name}</h3>
        <p>${spell.description.split('.')[0]}...</p>
      </div>
      <div class="flip-card-back divination">
        <div class="spark-container"></div>
        <h3>${spell.name}</h3>
        <ul>
          <li><strong>Spell Level:</strong> ${spell.spellLevel}</li>
          <li><strong>Casting Time:</strong> ${spell.castingTime}</li>
          <li><strong>Range:</strong> ${spell.range}</li>
          <li><strong>Duration:</strong> ${spell.duration}</li>
          <li><strong>Description:</strong> ${spell.description}</li>
          <li><strong>Classes:</strong> ${spell.classes.split(',').map(cls => {
        const className = cls.trim().toLowerCase();
        return `<span class="${className} class-name">${cls.trim()}</span>`;
    }).join(', ')}</li>
          ${spell.damage ? `<li><strong>Damage:</strong> <span class="damage">${spell.damage.split(' ')[0]}</span> <span class="necrotic">${spell.damage.split(' ').slice(1).join(' ')}</span></li>` : ''}
        </ul>
      </div>
    </div>
  `;

    return card;
}

async function populateSpells() {
    const response = await fetch('divination.json');
    const spells = await response.json();

    const container = document.getElementById('cardContainer');
    spells.forEach(spell => {
        const card = createSpellCard(spell);
        container.appendChild(card);
    });

    addSparkleListeners();
}

populateSpells();

function addSparkleListeners() {
    document.querySelectorAll('.flip-card-back').forEach(card => {
        const school = [...card.classList].find(cls => sparkColors[cls]);
        const sparkContainer = card.querySelector('.spark-container');
        let interval;

        card.addEventListener('mouseenter', () => {
            interval = setInterval(() => {
                const spark = document.createElement('div');
                spark.className = 'spark';
                spark.style.background = sparkColors[school] || '#fff';
                spark.style.left = `${Math.random() * 100}%`;
                spark.style.top = `${Math.random() * 100}%`;
                sparkContainer.appendChild(spark);

                setTimeout(() => spark.remove(), 1000);
            }, 80);
        });

        card.addEventListener('mouseleave', () => {
            clearInterval(interval);
        });
    });
}

function animateExitPentagram(color, callback) {
    const canvas = document.getElementById('exitCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.opacity = '1';

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const baseRadius = Math.min(canvas.width, canvas.height) / 4;
    let scale = 1;
    let rotation = 0;
    let frame = 0;
    const maxFrames = 40;

    const points = [];
    for (let i = 0; i < 5; i++) {
        const angle = (Math.PI / 2) + (i * 2 * Math.PI / 5);
        const x = Math.cos(angle);
        const y = -Math.sin(angle);
        points.push({ x, y });
    }

    const starLines = [
        [0, 2], [2, 4], [4, 1], [1, 3], [3, 0]
    ];

    function drawFrame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rotation);
        ctx.scale(scale, scale);

        ctx.beginPath();
        starLines.forEach(([from, to]) => {
            ctx.moveTo(points[from].x * baseRadius, points[from].y * baseRadius);
            ctx.lineTo(points[to].x * baseRadius, points[to].y * baseRadius);
        });

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.shadowColor = color;
        ctx.shadowBlur = 25;
        ctx.stroke();
        ctx.restore();

        rotation += 0.08;
        scale *= 0.96;

        frame++;
        if (frame < maxFrames) {
            requestAnimationFrame(drawFrame);
        } else {
            triggerFlash(callback, color);
        }
    }

    drawFrame();
}

function triggerFlash(callback, color) {
    const overlay = document.getElementById('transitionOverlay');
    overlay.classList.add('active');
    overlay.style.background = `radial-gradient(circle at center, ${color} 0%, #000 80%)`;

    setTimeout(() => {
        callback();
    }, 500);
}


function navigateTo(school) {
    const color = sparkColors[school] || '#fff';
    animateExitPentagram(color, () => {
        window.location.href = `/spellbook/spellbook.html`;
    });
}
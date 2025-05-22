
// Add this so the cards use the transition
document.querySelectorAll('.school-card').forEach(card => {
    card.addEventListener('click', () => {
        const school = card.querySelector('h2')?.textContent.toLowerCase();
        if (school === 'evocation' || school === 'necromancy') {
            navigateTo(`${school}/${school}.html`);
        }
    });
});

if (!sessionStorage.getItem("introPlayed")) {

    window.onload = () => {
        const canvas = document.getElementById("introCanvas");
        const ctx = canvas.getContext("2d");

        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100vw";
        canvas.style.height = "100vh";
        canvas.style.zIndex = "9999";

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) / 4;
        const runesRadius = radius + 40;

        // Background gradient + starfield
        function drawBackground() {
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width);
            gradient.addColorStop(0, "#1c0e28");
            gradient.addColorStop(0.5, "#0d0816");
            gradient.addColorStop(1, "#050505");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < 100; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const radius = Math.random() * 1.5;
                ctx.beginPath();
                ctx.fillStyle = "#ffffff";
                ctx.arc(x, y, radius, 0, 2 * Math.PI);
                ctx.fill();
            }

            // Redraw completed pentagram lines
            completedLines.forEach(([from, to]) => {
                ctx.beginPath();
                ctx.moveTo(from.x, from.y);
                ctx.lineTo(to.x, to.y);
                ctx.strokeStyle = "#8A2BE2";
                ctx.shadowColor = "#8A2BE2";
                ctx.shadowBlur = 10;
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.shadowBlur = 0;
            });

            if (circleDone) {
                // Draw the glow ring
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius + 10, 0, 2 * Math.PI);
                ctx.shadowColor = "#f0e6d0";
                ctx.shadowBlur = 40;
                ctx.strokeStyle = "transparent";
                ctx.stroke();
                ctx.shadowBlur = 0;

                // Draw the actual circle
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                ctx.strokeStyle = "#8A2BE2";
                ctx.shadowColor = "#8A2BE2";
                ctx.shadowBlur = 20;
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.shadowBlur = 0;
            }

            ctx.font = "32px serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.shadowBlur = 15;

            runePositions.forEach(({ x, y, rune, color }) => {
                ctx.fillStyle = color;
                ctx.shadowColor = color;
                ctx.fillText(rune, x, y);
            });

            ctx.shadowBlur = 0;
        }

        const pentagramPoints = [];
        for (let i = 0; i < 5; i++) {
            const angle = (Math.PI / 2) + (i * 2 * Math.PI / 5);
            const x = centerX + radius * Math.cos(angle);
            const y = centerY - radius * Math.sin(angle);
            pentagramPoints.push({ x, y });
        }

        const drawSteps = [
            [0, 2], [2, 4], [4, 1], [1, 3], [3, 0]
        ];

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#8A2BE2";
        let step = 0;
        const completedLines = [];
        let circleDone = false;
        let runesDone = false;
        const runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ'];
        const runeColors = [
            "#e24a4a", // Abjuration
            "#d47628", // Conjuration
            "#861fa5", // Divination
            "#267cc2", // Enchantment
            "#ff6b1f", // Evocation
            "#b4ffec", // Illusion
            "#6effd0", // Necromancy
            "#f147d5"  // Transmutation
        ];

        const runePositions = [];

        drawBackground();

        function drawLineSegment(from, to, progress) {
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(
                from.x + (to.x - from.x) * progress,
                from.y + (to.y - from.y) * progress
            );
            ctx.strokeStyle = "#8A2BE2";
            ctx.shadowColor = "#8A2BE2";
            ctx.shadowBlur = 15;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.shadowBlur = 0;
        }

        function animateLine(from, to, callback) {
            const startTime = performance.now();
            const duration = 800;

            function animate(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Clear and redraw everything up to this point
                drawBackground();

                // Redraw previous lines
                for (const [f, t] of completedLines) {
                    ctx.beginPath();
                    ctx.moveTo(f.x, f.y);
                    ctx.lineTo(t.x, t.y);
                    ctx.strokeStyle = "#8A2BE2";
                    ctx.shadowColor = "#8A2BE2";
                    ctx.shadowBlur = 10;
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                }

                // Draw current animated line
                drawLineSegment(from, to, progress);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    completedLines.push([from, to]);
                    callback();
                }
            }

            requestAnimationFrame(animate);
        }

        function animateCircle(callback) {
            const startTime = performance.now();
            const duration = 1500;

            function drawArcFrame(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const endAngle = 2 * Math.PI * progress;

                drawBackground(); // redraw stars and background

                // Redraw previously drawn lines
                for (const [f, t] of completedLines) {
                    ctx.beginPath();
                    ctx.moveTo(f.x, f.y);
                    ctx.lineTo(t.x, t.y);
                    ctx.strokeStyle = "#8A2BE2";
                    ctx.shadowColor = "#8A2BE2";
                    ctx.shadowBlur = 10;
                    ctx.stroke();
                    ctx.shadowBlur = 0;
                }

                // Draw the animated arc
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, endAngle);
                ctx.strokeStyle = "#8A2BE2";
                ctx.shadowColor = "#8A2BE2";
                ctx.shadowBlur = 20;
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.shadowBlur = 0;

                if (progress < 1) {
                    requestAnimationFrame(drawArcFrame);
                } else {
                    callback();
                }
            }

            requestAnimationFrame(drawArcFrame);
        }

        function drawLine() {
            if (step < drawSteps.length) {
                const [fromIdx, toIdx] = drawSteps[step];
                const from = pentagramPoints[fromIdx];
                const to = pentagramPoints[toIdx];
                animateLine(from, to, () => {
                    step++;
                    setTimeout(drawLine, 300); // optional delay between lines
                });
            } else {
                // After all lines are drawn, draw the glow + circle
                setTimeout(() => {
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius + 10, 0, 2 * Math.PI);
                    ctx.shadowColor = "#f0e6d0";
                    ctx.shadowBlur = 40;
                    ctx.strokeStyle = "transparent";
                    ctx.stroke();
                    ctx.shadowBlur = 0;

                    animateCircle(() => {
                        circleDone = true;
                        drawBackground()
                        drawRunes();
                    });

                }, 300);
            }
        }

        function drawRunes() {
            ctx.font = "32px serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.shadowBlur = 15;

            runes.forEach((rune, i) => {
                setTimeout(() => {
                    const angle = (2 * Math.PI / runes.length) * i - Math.PI / 2;
                    const x = centerX + runesRadius * Math.cos(angle);
                    const y = centerY + runesRadius * Math.sin(angle);
                    runePositions.push({ x, y, rune, color: runeColors[i] });
                    drawBackground()

                    // Only call maybeStartImplode after last rune
                    if (i === runes.length - 1) {
                        runesDone = true;
                        maybeStartImplode();
                    }
                }, i * 400);
            });
        }

        function maybeStartImplode() {
            if (circleDone && runesDone) {
                implodeEffect();
            }
        }

        function implodeEffect() {
            let progress = 0;
            const steps = 30;

            const implodeInterval = setInterval(() => {
                drawBackground(); // redraw background behind shrinking

                // Shrink runes
                runePositions.forEach(({ x, y, rune, color }) => {
                    const cx = centerX + (x - centerX) * (1 - progress / steps);
                    const cy = centerY + (y - centerY) * (1 - progress / steps);
                    ctx.fillStyle = color;
                    ctx.shadowColor = color;
                    ctx.fillText(rune, cx, cy);
                });

                // Shrink pentagram and circle
                ctx.strokeStyle = "#8A2BE2";
                const shrinkRadius = radius * (1 - progress / steps);
                const shrinkPoints = [];
                for (let i = 0; i < 5; i++) {
                    const angle = (Math.PI / 2) + (i * 2 * Math.PI / 5);
                    const x = centerX + shrinkRadius * Math.cos(angle);
                    const y = centerY - shrinkRadius * Math.sin(angle);
                    shrinkPoints.push({ x, y });
                }
                drawSteps.forEach(([fromIdx, toIdx]) => {
                    ctx.beginPath();
                    ctx.moveTo(shrinkPoints[fromIdx].x, shrinkPoints[fromIdx].y);
                    ctx.lineTo(shrinkPoints[toIdx].x, shrinkPoints[toIdx].y);
                    ctx.stroke();
                });

                ctx.beginPath();
                ctx.arc(centerX, centerY, shrinkRadius, 0, 2 * Math.PI);
                ctx.stroke();

                progress++;
                if (progress >= steps) {
                    clearInterval(implodeInterval);
                    whiteFlash();
                }
            }, 30);
        }

        function whiteFlash() {
            const flash = document.createElement("div");
            flash.style.position = "fixed";
            flash.style.top = 0;
            flash.style.left = 0;
            flash.style.width = "100vw";
            flash.style.height = "100vh";
            flash.style.backgroundColor = "#ffffff";
            flash.style.zIndex = "10000";
            flash.style.opacity = "0";
            flash.style.transition = "opacity 0.3s ease";

            document.body.appendChild(flash);

            requestAnimationFrame(() => {
                flash.style.opacity = "1";
            });

            setTimeout(() => {
                canvas.remove(); // remove intro canvas
                flash.style.opacity = "0";
                document.getElementById("page").style.opacity = "1";

                setTimeout(() => {
                    document.body.removeChild(flash);
                }, 300);
            }, 300);
            sessionStorage.setItem("introPlayed", "true");
        }

        drawLine();
    };

} else {
    document.getElementById("page").style.opacity = "1";
    const canvas = document.getElementById("introCanvas");
    if (canvas) canvas.remove();
}

const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

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
    gradient.addColorStop(0, "#1c0e28");
    gradient.addColorStop(0.5, "#0d0816");
    gradient.addColorStop(1, "#050505");

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

const sparkColors = {
    abjuration: '#e24a4a',
    conjuration: '#d47628',
    divination: '#861fa5',
    enchantment: '#267cc2',
    evocation: '#ff6b1f',
    illusion: '#b4ffec',
    necromancy: '#6effd0',
    transmutation: '#f147d5'
};

document.querySelectorAll('.school-card').forEach(card => {
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
        }, 80); // frequency of sparks
    });

    card.addEventListener('mouseleave', () => {
        clearInterval(interval);
    });
});

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
    let opacity = 1;
    let frame = 0;
    const maxFrames = 100;

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
        ctx.globalAlpha = opacity;

        // Draw glowing circle
        ctx.beginPath();
        ctx.arc(0, 0, baseRadius + 10, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = color;
        ctx.shadowBlur = 20;
        ctx.stroke();

        // Draw pentagram
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
        ctx.globalAlpha = 1; // reset for next frame

        rotation += 0.05;
        scale *= 0.99;
        opacity *= 0.985;

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

function navigateTo(page, school) {
    const color = sparkColors[school] || '#fff';
    animateExitPentagram(color, () => {
        window.location.href = `schools/${page}`;
    });
}

// Hook into card clicks
document.querySelectorAll('.school-card').forEach(card => {
    card.addEventListener('click', () => {
        const school = [...card.classList].find(cls => sparkColors[cls]);
        if (school) {
            navigateTo(`/DnD-Wiki/${school}/${school}.html`, school);
        }
    });
});
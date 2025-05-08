async function loadUndead() {
    try {
        const response = await fetch('undead.json');
        const data = await response.json();
        const front = data.front;
        const range = data.range;
        const magic = data.magic;

        const frontContainer = document.getElementById('front');
        frontContainer.innerHTML = '';

        Object.values(front).forEach(undead => {
            const undeadCard = document.createElement('div');
            undeadCard.classList.add('undead-card')

            undeadCard.innerHTML = `
                <h3>${undead.name}</h3>
                <p>${undead.description}</p>
            `;

            frontContainer.appendChild(undeadCard);
        });

        const rangeContainer = document.getElementById('range');
        rangeContainer.innerHTML = '';

        Object.values(range).forEach(undead => {
            const undeadCard = document.createElement('div');
            undeadCard.classList.add('undead-card')

            undeadCard.innerHTML = `
                <h3>${undead.name}</h3>
                <p>${undead.description}</p>
            `;

            rangeContainer.appendChild(undeadCard);
        });

        const magicContainer = document.getElementById('magic');
        magicContainer.innerHTML = '';

        Object.values(magic).forEach(undead => {
            const undeadCard = document.createElement('div');
            undeadCard.classList.add('undead-card')

            undeadCard.innerHTML = `
                <h3>${undead.name}</h3>
                <p>${undead.description}</p>
            `;

            magicContainer.appendChild(undeadCard);
        });

    } catch (err) {
        console.error('Failed to load undead data:', err)
    }
}

loadUndead();
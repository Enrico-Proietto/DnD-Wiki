async function loadFactions() {
    const response = await fetch('faction.json');
    const data = await response.json();

    const factionGrid = document.getElementById('faction-grid');
    factionGrid.innerHTML = '';

    Object.values(data).forEach(faction => {
        const factionSlot = document.createElement('div');
        factionSlot.classList.add('faction-card');
        factionSlot.classList.add(faction.type);

        // Assign the click handler properly
        factionSlot.onclick = () => navigateTo(faction.link);

        factionSlot.innerHTML = `
            <div class="spark-container"></div>
            <h2>${faction.name}</h2>
        `;
        factionGrid.appendChild(factionSlot);
    });
}

loadFactions();

function navigateTo(page) {
    window.location.href = `/faction/${page}`;
}

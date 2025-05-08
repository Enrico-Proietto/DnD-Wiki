async function loadFactions() {
    const response = await fetch('faction.json');
    const data = await response.json();

    const factionGrid = document.getElementById('faction-grid');
    factionGrid.innerHTML = '';

    Object.values(data).forEach(faction => {
        const factionSlot = document.createElement('div');
        factionSlot.classList.add('faction-card');
        factionSlot.classList.add(faction.type)

        factionSlot.innerHTML = `
            <h2>${faction.name}</h2>
        `;
        factionGrid.appendChild(factionSlot);
    })
}

loadFactions();
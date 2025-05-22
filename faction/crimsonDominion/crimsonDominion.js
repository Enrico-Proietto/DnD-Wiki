async function renderHouses() {
    const response = await fetch('houses.json');
    const houseData = await response.json();

    const houseContainer = document.getElementById('houses');
    houseContainer.innerHTML = '';

    houseData.forEach(house => {
        const houseCard = document.createElement('div');
        houseCard.className = 'house-card';
        houseCard.innerHTML = `
            <h3>${house.name}</h3>
            <p>${house.description}</p>
            <div class="members">
              <h4>Notable Members</h4>
              <ul>${house.members.split(',').map(m => `<li>${m.trim()}</li>`).join('')}</ul>
            </div>
        `;
        houseContainer.appendChild(houseCard);
    });
}

renderHouses();
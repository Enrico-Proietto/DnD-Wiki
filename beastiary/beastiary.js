async function loadBeasts() {
    const response = await fetch('beastiary.json');
    const data = await response.json();

    const beastGrid = document.getElementById('category-grid');
    beastGrid.innerHTML = '';

    Object.values(data).forEach(beast => {
        const beastSlot = document.createElement('div');
        beastSlot.classList.add('category-card');
        beastSlot.classList.add(`${beast.type}`)

        beastSlot.setAttribute('onClick', `goToCategory('${beast.pageSrc}')`)

        beastSlot.innerHTML = `
            <h2>${beast.name}</h2>
        `;
        beastGrid.appendChild(beastSlot);
    })
}

loadBeasts()

function goToCategory(page) {
    window.location.href = `${page}`;
}

function toggleSidenav() {
    document.querySelector(".sidenav").classList.toggle("collapsed");
    document.querySelector(".main").classList.toggle("expanded");
}
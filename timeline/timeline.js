async function loadLore() {
    const response = await fetch('timeline.json');
    const data = await response.json();

    const timelineGrid = document.getElementById('timeline');
    timelineGrid.innerHTML = '';

    Object.values(data).forEach(time => {
        const timeSlot = document.createElement('div');
        timeSlot.classList.add('timeline-event');
        timeSlot.classList.add(`${time.direction}`);
        timeSlot.classList.add(`${time.type}`)

        timeSlot.innerHTML = `
            <div class="event-title">${time.name}</div>
            <div class="event-date">${time.year}</div>
            <div class="event-description">${time.description}</div>
        `;
        timelineGrid.appendChild(timeSlot);
    })
}

loadLore()
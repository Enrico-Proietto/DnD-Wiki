async function loadCalender() {
    const response = await fetch('calendar.json');
    const calendarData = await response.json();

    const { daysOfWeek, months, firstDayOfYear } = calendarData;
    const calendarContainer = document.getElementById("calendar");

    let currentDayIndex = daysOfWeek.indexOf(firstDayOfYear);
    const currentDate = calendarData.currentDay;

    months.forEach(month => {
        const monthDiv = document.createElement("div");
        monthDiv.classList.add("month");

        const title = document.createElement("h2");
        title.textContent = month.name;
        monthDiv.appendChild(title);

        const grid = document.createElement("div");
        grid.classList.add("calendar-grid");

        // Add day headers
        daysOfWeek.forEach(day => {
            const dayHeader = document.createElement("div");
            dayHeader.classList.add("day-name");
            dayHeader.textContent = day;
            grid.appendChild(dayHeader);
        });

        // Empty cells before first day of the month
        for (let i = 0; i < currentDayIndex; i++) {
            const emptyCell = document.createElement("div");
            emptyCell.classList.add("last-month");
            grid.appendChild(emptyCell);
        }

        // Fill days
        for (let day = 1; day <= month.days; day++) {
            const dayCell = document.createElement("div");
            dayCell.classList.add("day");

            if (month.name === currentDate.month && day === currentDate.day) {
                dayCell.classList.add("today");
                dayCell.title = "Today";
                dayCell.textContent = `🔆 ${day}`;
            } else {
                dayCell.textContent = day;
            }

            grid.appendChild(dayCell);
        }

        // Add to DOM
        monthDiv.appendChild(grid);
        calendarContainer.appendChild(monthDiv);

        // Update currentDayIndex for the next month
    
        currentDayIndex = (currentDayIndex + month.days) % daysOfWeek.length;
    });

}

loadCalender()
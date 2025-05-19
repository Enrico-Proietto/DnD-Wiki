async function renderWeather() {
    const response = await fetch('weather.json');
    const data = await response.json();

    const todayDiv = document.getElementById("today-weather");
    const forecastDiv = document.getElementById("forecast-weather");

    todayDiv.innerHTML = `
    <h3>Today</h3>
    <p><strong>Condition:</strong> ${data.today.description}</p>
    <p><strong>Temp:</strong> ${data.today.temperature}</p>
    <p><strong>Anomaly:</strong> ${data.today.anomaly}</p>
    <p><strong>Moon:</strong> ${data.today.moonPhase}</p>
  `;

    let forecastHTML = "<h3>Forecast</h3>";
    data.forecast.forEach(entry => {
        forecastHTML += `<p>${entry.icon} <strong>${entry.day}</strong>: ${entry.desc}</p>`;
    });
    forecastDiv.innerHTML = forecastHTML;
}

renderWeather();
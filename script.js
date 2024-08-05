document.getElementById('weather-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const city = document.getElementById('city').value;
    const resultsDiv = document.getElementById('weather-results');

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0df25407ba2c2dba5e381cf6299078e9&units=metric&lang=es`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.cod !== 200) {
            resultsDiv.innerHTML = `<p>${data.message}</p>`;
        } else {
            resultsDiv.innerHTML = `
                <h2>Clima en ${data.name}, ${data.sys.country}</h2>
                <p><strong>Temperatura:</strong> ${data.main.temp} °C</p>
                <p><strong>Descripción:</strong> ${data.weather[0].description}</p>
                <p><strong>Humedad:</strong> ${data.main.humidity} %</p>
                <p><strong>Velocidad del Viento:</strong> ${data.wind.speed} m/s</p>
            `;
        }
    } catch (error) {
        resultsDiv.innerHTML = `<p>${error.message}</p>`;
    }
});

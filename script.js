document.getElementById('weather-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const ciudad = document.getElementById('ciudad').value;
    const resultadoDiv = document.getElementById('weather-results');

    try {
        const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=0df25407ba2c2dba5e381cf6299078e9&units=metric&lang=es`);
        
        if (!respuesta.ok) {
            throw new Error(`ESTAS INGRESANDO UNA CIUDAD INCORRECTA`);
        }
        const data = await respuesta.json();

        if (data.cod !== 200) {
            resultadoDiv.innerHTML = `<p>${data.message}</p>`;
        } else {
            resultadoDiv.innerHTML = `
                <h2>Clima en ${data.name}, ${data.sys.country}</h2>
                <p><strong>Temperatura:</strong> ${data.main.temp} °C</p>
                <p><strong>Descripción:</strong> ${data.weather[0].description}</p>
                <p><strong>Humedad:</strong> ${data.main.humidity} %</p>
                <p><strong>Velocidad del Viento:</strong> ${data.wind.speed} m/s</p>
                <p><strong>Temperatura Minina:</strong> ${data.main.temp_min} °C</p>
                <p><strong>longitud</strong> ${data.coord.lon}</p>
                <p><strong>latitud</strong> ${data.coord.lat}</p>
            `;
        }
    } catch (error) {
        resultadoDiv.innerHTML = `<p>${error.message}</p>`;
    }
});

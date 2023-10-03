
const apiKey = '6b3a36c3748705725de7a3339860303e';
let city = ''; 

let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

async function getWeatherData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los datos del clima:', error);
    }
}

// Función para obtener el nombre del día de la semana a partir de una fecha
function getDayOfWeek(date) {
    const options = { weekday: 'long' }; // Obtiene el nombre completo del día
    return date.toLocaleDateString(undefined, options);
}

// Función para actualizar el pronóstico cuando se hace clic en el botón "Buscar"
function updateWeatherByCity() {
    city = document.getElementById('cityInput').value;
    currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    // Actualiza el pronóstico actual
    getWeatherData(currentWeatherUrl).then(data => {
        document.getElementById('city').textContent = data.name.toUpperCase();
        document.getElementById('temperature').textContent = data.main.temp;
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('humidity').textContent = data.main.humidity;
        document.getElementById('wind').textContent = data.wind.speed;
    });

    // Actualiza el pronóstico extendido
    getWeatherData(forecastUrl).then(data => {
        displayForecast(data.list);
    });
}

// Función para mostrar el pronóstico extendido
function displayForecast(forecastData) {
    const forecastContainer = document.getElementById('forecast-list');
    forecastContainer.innerHTML = ''; // Limpiar el contenido anterior

    forecastData.forEach(item => {
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        
        const dateTime = new Date(item.dt * 1000); // Convertir la marca de tiempo a una fecha
        const date = dateTime.toLocaleDateString();
        const dayOfWeek = getDayOfWeek(dateTime); // Obtener el día de la semana

        forecastItem.innerHTML = `
            <h3>${dayOfWeek.toUpperCase()}, ${date}</h3>
            <p>Temperatura: ${item.main.temp}°C</p>
            <p>Descripción: ${item.weather[0].description}</p>
            <p>Humedad: ${item.main.humidity}%</p>
            <p>Viento: ${item.wind.speed} m/s</p>
        `;

        forecastContainer.appendChild(forecastItem);
    });
}

// Agregar un controlador de evento para el botón "Buscar"
document.getElementById('searchButton').addEventListener('click', updateWeatherByCity);

// Cargar el pronóstico del tiempo al cargar la página
updateWeatherByCity();

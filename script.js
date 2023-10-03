// Reemplaza 'TU_API_KEY' con tu clave de API de OpenWeatherMap
const apiKey = '6b3a36c3748705725de7a3339860303e';
let city = 'Rosario';  // Ciudad predeterminada

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
// Función para traducir la descripción del clima de inglés a español
function translateWeatherDescription(description) {
    switch (description.toLowerCase()) {
        case 'thunderstorm with light rain':
            return 'Tormenta con lluvia ligera';
        case 'thunderstorm with rain':
            return 'Tormenta con lluvia';
        case 'thunderstorm with heavy rain':
            return 'Tormenta con lluvia intensa';
        case 'light thunderstorm':
            return 'Tormenta ligera';
        case 'thunderstorm':
            return 'Tormenta';
        case 'heavy thunderstorm':
            return 'Tormenta intensa';
        case 'ragged thunderstorm':
            return 'Tormenta irregular';
        case 'thunderstorm with light drizzle':
            return 'Tormenta con llovizna ligera';
        case 'thunderstorm with drizzle':
            return 'Tormenta con llovizna';
        case 'thunderstorm with heavy drizzle':
            return 'Tormenta con llovizna intensa';
        case 'light intensity drizzle':
            return 'Llovizna ligera';
        case 'drizzle':
            return 'Llovizna';
        case 'heavy intensity drizzle':
            return 'Llovizna intensa';
        case 'light intensity drizzle rain':
            return 'Llovizna ligera con lluvia';
        case 'drizzle rain':
            return 'Llovizna con lluvia';
        case 'heavy intensity drizzle rain':
            return 'Llovizna intensa con lluvia';
        case 'shower rain and drizzle':
            return 'Aguacero y llovizna';
        case 'heavy shower rain and drizzle':
            return 'Aguacero intenso y llovizna';
        case 'shower drizzle':
            return 'Llovizna de aguacero';
        case 'light rain':
            return 'Lluvia ligera';
        case 'moderate rain':
            return 'Lluvia moderada';
        case 'heavy intensity rain':
            return 'Lluvia intensa';
        case 'very heavy rain':
            return 'Lluvia muy intensa';
        case 'extreme rain':
            return 'Lluvia extrema';
        case 'freezing rain':
            return 'Lluvia helada';
        case 'light intensity shower rain':
            return 'Aguacero ligero';
        case 'shower rain':
            return 'Aguacero';
        case 'heavy intensity shower rain':
            return 'Aguacero intenso';
        case 'ragged shower rain':
            return 'Aguacero irregular';
        case 'light snow':
            return 'Nieve ligera';
        case 'snow':
            return 'Nieve';
        case 'heavy snow':
            return 'Nieve intensa';
        case 'sleet':
            return 'Aguanieve';
        case 'shower sleet':
            return 'Aguanieve de aguacero';
        case 'light rain and snow':
            return 'Lluvia y nieve ligera';
        case 'rain and snow':
            return 'Lluvia y nieve';
        case 'light shower snow':
            return 'Aguacero de nieve ligero';
        case 'shower snow':
            return 'Aguacero de nieve';
        case 'heavy shower snow':
            return 'Aguacero de nieve intenso';
        case 'mist':
            return 'Niebla';
        case 'smoke':
            return 'Humo';
        case 'haze':
            return 'Calina';
        case 'sand/ dust whirls':
            return 'Remolinos de arena/polvo';
        case 'fog':
            return 'Niebla';
        case 'sand':
            return 'Arena';
        case 'dust':
            return 'Polvo';
        case 'volcanic ash':
            return 'Ceniza volcánica';
        case 'squalls':
            return 'Chubascos';
        case 'tornado':
            return 'Tornado';
        case 'clear sky':
            return 'Cielo despejado';
        case 'few clouds':
            return 'Pocas nubes';
        case 'scattered clouds':
            return 'Nubes dispersas';
        case 'broken clouds':
            return 'Nubes rotas';
        case 'overcast clouds':
            return 'Cielo nublado';
        default:
            return description;
    }
}

// Función para actualizar el pronóstico cuando se hace clic en el botón "Buscar"
function updateWeatherByCity() {
    city = document.getElementById('cityInput').value.toUpperCase();
    currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    // Actualiza el pronóstico actual
    getWeatherData(currentWeatherUrl).then(data => {
        document.getElementById('city').textContent = data.name.toUpperCase();
        document.getElementById('temperature').textContent = data.main.temp;
        document.getElementById('description').textContent = translateWeatherDescription(data.weather[0].description);
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
        
        const dateTime = new Date(item.dt_txt); // Convertir la marca de tiempo a una fecha
        const date = dateTime.toLocaleDateString();
        const time = dateTime.toLocaleTimeString(); // Obtiene la hora
        const dayOfWeek = getDayOfWeek(dateTime); // Obtener el día de la semana
        const weatherDescription = translateWeatherDescription(item.weather[0].description);// Traduce la descripcion antes de mostrarla

        forecastItem.innerHTML = `
            <h3>${dayOfWeek.toUpperCase()}, ${date}</h3>
            <p>Hora: ${time}</p> 
            <p>Temperatura: ${item.main.temp}°C</p>
            <p>Descripción: ${weatherDescription}</p>
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



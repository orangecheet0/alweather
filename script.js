const defaultCity = 'Huntsville';
const userAgent = 'MyWeatherApp (ben.f.shults@gmail.com)';  // Replace with your email
const openCageApiKey = '35fab0f732074dea8fce792e7dc8c090';  // Replace with your OpenCage API key
const openWeatherMapApiKey = 'd9df002e51ecf37f962de05a38c58dcf';  // Replace with your OpenWeatherMap API key

document.addEventListener('DOMContentLoaded', () => {
    getWeather(defaultCity);
    initMap();
});

const form = document.getElementById('weather-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    try {
        const latLon = await getLatLon(city);
        const pointUrl = `https://api.weather.gov/points/${latLon.lat},${latLon.lon}`;
        const headers = { "User-Agent": userAgent };
        const pointResponse = await fetch(pointUrl, { headers });
        if (!pointResponse.ok) throw new Error('Failed to get point data');
        const pointData = await pointResponse.json();
        const forecastUrl = pointData.properties.forecast;
        const forecastResponse = await fetch(forecastUrl, { headers });
        if (!forecastResponse.ok) throw new Error('Failed to get forecast data');
        const forecastData = await forecastResponse.json();
        displayCurrentWeather(forecastData.properties.periods[0]);
        displayForecast(forecastData.properties.periods.slice(1, 6));
    } catch (error) {
        alert(error.message);
    }
}

function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('current-weather');
    currentWeatherDiv.innerHTML = `
        <h3>${data.name}</h3>
        <p>Temperature: ${data.temperature}°F</p>
        <p>Wind: ${data.windSpeed} ${data.windDirection}</p>
        <p>Conditions: ${data.shortForecast}</p>
    `;
}

function displayForecast(periods) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = '';
    periods.forEach(period => {
        forecastDiv.innerHTML += `
            <div class="forecast-card">
                <p>${period.name}</p>
                <p>${period.temperature}°F</p>
                <p>${period.shortForecast}</p>
            </div>
        `;
    });
}

async function getLatLon(city) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${openCageApiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to get location data');
    const data = await response.json();
    if (data.results.length === 0) throw new Error('City not found');
    const { lat, lng } = data.results[0].geometry;
    return { lat, lon: lng };
}

function initMap() {
    // Initialize the map centered on North Alabama (Huntsville)
    var map = L.map('map').setView([34.7304, -86.5861], 7);

    // Add OpenStreetMap base layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add OpenWeatherMap precipitation layer
    L.tileLayer(`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${d9df002e51ecf37f962de05a38c58dcf}`, {
        attribution: 'Map data &copy; <a href="https://openweathermap.org">OpenWeatherMap</a>'
    }).addTo(map);
}

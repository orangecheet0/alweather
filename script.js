const apiKey = 'd9df002e51ecf37f962de05a38c58dcf';  // Replace with your OpenWeatherMap API key
const defaultCity = 'Huntsville';

document.addEventListener('DOMContentLoaded', () => {
    getWeather(defaultCity);
    getForecast(defaultCity);
});

const form = document.getElementById('weather-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeather(city);
        getForecast(city);
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayCurrentWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayCurrentWeather(data) {
    const currentWeatherDiv = document.getElementById('current-weather');
    currentWeatherDiv.innerHTML = `
        <h3>${data.name}</h3>
        <p>Temperature: ${data.main.temp}°F</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} mph</p>
        <p>Conditions: ${data.weather[0].description}</p>
        <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">
    `;
}

async function getForecast(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayForecast(data) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = '';
    const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00')); // Noon each day
    dailyData.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = day.main.temp;
        const icon = day.weather[0].icon;
        forecastDiv.innerHTML += `
            <div class="forecast-card">
                <p>${dayName}</p>
                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">
                <p>${temp}°F</p>
            </div>
        `;
    });
}

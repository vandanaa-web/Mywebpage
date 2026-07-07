// ==========================================
// DAY 4: WEATHER APP - Complete JavaScript
// ==========================================

// ==========================================
// PART 1: API Configuration
// ==========================================

// IMPORTANT: Get your FREE API key from https://openweathermap.org/api
// Sign up for a free account and get your API key
const API_KEY = "d0f972983b6ddb34b94de76a5b6dffb6"; // <-- REPLACE THIS WITH YOUR API KEY!
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// If you don't want to sign up, you can use this FREE test API:
// const API_KEY = "bd5e378503939ddaee76f12ad7a97608"; // This is a public test key

// ==========================================
// PART 2: DOM References
// ==========================================

const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const weatherInfo = document.querySelector("#weatherInfo");
const loading = document.querySelector("#loading");
const error = document.querySelector("#error");
const errorMessage = document.querySelector("#errorMessage");

// Weather display elements
const cityName = document.querySelector("#cityName");
const temperature = document.querySelector("#temperature");
const weatherDescription = document.querySelector("#weatherDescription");
const weatherIcon = document.querySelector("#weatherIcon");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#windSpeed");
const feelsLike = document.querySelector("#feelsLike");

// ==========================================
// PART 3: Fetch Weather Data (THE MAGIC!)
// ==========================================

async function fetchWeather(city) {
    try {
        // STEP 1: Show loading state
        showLoading();
        
        // STEP 2: Build the URL with the city name and API key
        const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
        
        console.log("🌐 Fetching weather for:", city);
        console.log("📡 Request URL:", url);
        
        // STEP 3: Make the API request using fetch()
        const response = await fetch(url);
        
        // STEP 4: Check if the response is OK (200 status)
        if (!response.ok) {
            // If city not found, API returns 404
            if (response.status === 404) {
                throw new Error(`City "${city}" not found. Please check the spelling.`);
            } else {
                throw new Error(`API Error: ${response.status} - ${response.statusText}`);
            }
        }
        
        // STEP 5: Parse the JSON data
        const data = await response.json();
        
        console.log("✅ Weather data received:", data);
        
        // STEP 6: Update the UI with the data
        displayWeather(data);
        
        // STEP 7: Hide loading, show weather
        hideLoading();
        showWeather();
        hideError();
        
    } catch (error) {
        // STEP 8: Handle any errors
        console.error("❌ Error fetching weather:", error);
        showError(error.message);
        hideLoading();
        hideWeather();
    }
}

// ==========================================
// PART 4: Display Weather Data on Page
// ==========================================

function displayWeather(data) {
    // Extract data from the API response
    const name = data.name;
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const humidityValue = data.main.humidity;
    const windSpeedValue = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h
    const feelsLikeValue = Math.round(data.main.feels_like);
    
    // Get emoji based on weather condition
    const weatherEmoji = getWeatherEmoji(icon);
    
    // Capitalize first letter of description
    const capitalizedDescription = description.charAt(0).toUpperCase() + description.slice(1);
    
    // Update the DOM
    cityName.textContent = name;
    temperature.textContent = `${temp}°C`;
    weatherDescription.textContent = capitalizedDescription;
    weatherIcon.textContent = weatherEmoji;
    humidity.textContent = `${humidityValue}%`;
    windSpeed.textContent = `${windSpeedValue} km/h`;
    feelsLike.textContent = `${feelsLikeValue}°C`;
}

// ==========================================
// PART 5: Weather Emoji Helper
// ==========================================

function getWeatherEmoji(iconCode) {
    // Map OpenWeatherMap icon codes to emojis
    const emojiMap = {
        '01d': '☀️', // Clear sky (day)
        '01n': '🌙', // Clear sky (night)
        '02d': '⛅', // Few clouds (day)
        '02n': '☁️', // Few clouds (night)
        '03d': '☁️', // Scattered clouds
        '03n': '☁️',
        '04d': '☁️', // Broken clouds
        '04n': '☁️',
        '09d': '🌧️', // Shower rain
        '09n': '🌧️',
        '10d': '🌦️', // Rain (day)
        '10n': '🌧️', // Rain (night)
        '11d': '⛈️', // Thunderstorm
        '11n': '⛈️',
        '13d': '❄️', // Snow
        '13n': '❄️',
        '50d': '🌫️', // Mist
        '50n': '🌫️',
        'default': '🌤️'
    };
    
    return emojiMap[iconCode] || emojiMap['default'];
}

// ==========================================
// PART 6: UI Helper Functions
// ==========================================

function showLoading() {
    loading.classList.add('show');
    weatherInfo.classList.remove('show');
    error.classList.remove('show');
}

function hideLoading() {
    loading.classList.remove('show');
}

function showWeather() {
    weatherInfo.classList.add('show');
}

function hideWeather() {
    weatherInfo.classList.remove('show');
}

function showError(message) {
    errorMessage.textContent = message;
    error.classList.add('show');
}

function hideError() {
    error.classList.remove('show');
}

// ==========================================
// PART 7: Event Listeners
// ==========================================

// Search button click
searchBtn.addEventListener('click', function() {
    const city = cityInput.value.trim();
    if (city === '') {
        showError('Please enter a city name!');
        return;
    }
    fetchWeather(city);
});

// Press Enter key to search
cityInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
});

// ==========================================
// PART 8: Load Default City on Page Load
// ==========================================

// Load weather for London when page loads
window.addEventListener('DOMContentLoaded', function() {
    fetchWeather('London');
});

// ==========================================
// PART 9: BONUS - Save Last Searched City
// ==========================================

// Save city to localStorage when searched
function saveCity(city) {
    localStorage.setItem('lastCity', city);
}

// Load last searched city
function loadLastCity() {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        cityInput.value = lastCity;
        fetchWeather(lastCity);
    }
}

// Uncomment this to enable saving:
// searchBtn.addEventListener('click', function() {
//     const city = cityInput.value.trim();
//     if (city !== '') {
//         saveCity(city);
//     }
// });
// loadLastCity();

// ==========================================
// PART 10: BONUS - API Tips
// ==========================================

console.log('🌤️ Weather App Loaded!');
console.log('📝 Tips:');
console.log('1. Get your free API key at https://openweathermap.org/api');
console.log('2. Use city names like: London, New York, Tokyo, Paris');
console.log('3. Try adding "country code": London,UK or New York,US');
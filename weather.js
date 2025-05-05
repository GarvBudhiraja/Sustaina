// Weather API configuration
const WEATHER_API_KEY = '8d2de98e089f1c28e1a22fc19a24ef04'; // Free API key for testing
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

class DynamicEcoWeather {
    constructor() {
        console.log('Initializing DynamicEcoWeather...');
        this.weatherContainer = document.querySelector('.weather-container');
        this.weatherBackground = document.createElement('div');
        this.weatherBackground.className = 'weather-background';
        this.weatherContainer.appendChild(this.weatherBackground);
        console.log('Weather container found:', this.weatherContainer);
        this.init();
    }

    async init() {
        console.log('Starting initialization...');
        this.showLoading();
        try {
            const position = await this.getCurrentPosition();
            console.log('Got position:', position);
            const weather = await this.getWeatherData(position.coords.latitude, position.coords.longitude);
            console.log('Got weather data:', weather);
            this.updateWeatherUI(weather);
            this.startWeatherAnimation(weather);
        } catch (error) {
            console.error('Error initializing weather:',error);
            this.showError();
        }
    }

    showLoading() {
        console.log('Showing loading state...');
        this.weatherContainer.innerHTML = `
            <div class="weather-info">
                <div class="weather-loading">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Loading weather data...</p>
                </div>
            </div>
        `;
    }

    getCurrentPosition() {
        console.log('Getting current position...');
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported'));
            }
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        });
    }

    async getWeatherData(lat, lon) {
        console.log('Fetching weather data for:', lat, lon);
        try {
            const response = await fetch(
                `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
            );
            if (!response.ok) throw new Error('Weather data fetch failed');
            return response.json();
        } catch (error) {
            console.error('Error fetching weather:', error);
            throw error;
        }
    }

    isNightTime(data) {
        const now = Math.floor(Date.now() / 1000);
        const isNight = now < data.sys.sunrise || now > data.sys.sunset;
        console.log('Checking night time:', { now, sunrise: data.sys.sunrise, sunset: data.sys.sunset, isNight });
        return isNight;
    }

    updateWeatherUI(data) {
        console.log('Updating weather UI with data:', data);
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const location = data.name;
        const weatherType = data.weather[0].main;
        const isNight = this.isNightTime(data);
        const icon = this.getWeatherIcon(weatherType, isNight);
        const feelsLike = Math.round(data.main.feels_like);
        const humidity = data.main.humidity;
        
        // Add night-mode class to container
        this.weatherContainer.classList.toggle('night-mode', isNight);
        
        this.weatherContainer.innerHTML = `
            <div class="weather-info">
                <div class="weather-header">
                    <div class="weather-location">
                        <i class="fas fa-map-marker-alt"></i>
                        ${location}
                    </div>
                    <div class="weather-time">
                        <i class="fas ${isNight ? 'fa-moon' : 'fa-sun'}"></i>
                        ${isNight ? 'Night' : 'Day'}
                    </div>
                </div>
                <div class="weather-main">
                    <div class="weather-icon">${icon}</div>
                    <div class="weather-temperature">${temperature}°C</div>
                </div>
                <div class="weather-details">
                    <div class="weather-description">${description}</div>
                    <div class="weather-extra">
                        <span><i class="fas fa-thermometer-half"></i> Feels like: ${feelsLike}°C</span>
                        <span><i class="fas fa-tint"></i> Humidity: ${humidity}%</span>
                    </div>
                </div>
                <div class="eco-tip">${this.getEcoTip(weatherType, isNight)}</div>
            </div>
        `;

        // Re-add the background div since innerHTML replaced it
        this.weatherContainer.appendChild(this.weatherBackground);
    }

    startWeatherAnimation(data) {
        console.log('Starting weather animation...');
        const weatherType = data.weather[0].main;
        const isNight = this.isNightTime(data);
        
        // Clear any existing animation classes
        this.weatherBackground.className = 'weather-background';
        
        // Add appropriate animation class based on weather and time
        if (isNight) {
            console.log('Applying night animation');
            this.weatherContainer.style.background = 'rgba(25, 29, 45, 0.85)';
            this.weatherBackground.classList.add('night-clear-animation');
        } else {
            console.log('Applying day animation');
            this.weatherContainer.style.background = 'rgba(255, 255, 255, 0.85)';
            if (weatherType.toLowerCase() === 'clear') {
                this.weatherBackground.classList.add('sun-animation');
            } else if (weatherType.toLowerCase() === 'clouds') {
                this.weatherBackground.classList.add('cloudy-animation');
            } else if (weatherType.toLowerCase() === 'rain' || weatherType.toLowerCase() === 'drizzle') {
                this.weatherBackground.classList.add('rain-animation');
            }
        }
    }

    getWeatherIcon(weatherType, isNight) {
        const icons = {
            'Clear': isNight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>',
            'Clouds': isNight ? '<i class="fas fa-cloud-moon"></i>' : '<i class="fas fa-cloud-sun"></i>',
            'Rain': '<i class="fas fa-cloud-rain"></i>',
            'Snow': '<i class="fas fa-snowflake"></i>',
            'Thunderstorm': '<i class="fas fa-bolt"></i>',
            'Drizzle': '<i class="fas fa-cloud-rain"></i>',
            'Mist': '<i class="fas fa-smog"></i>',
            'Smoke': '<i class="fas fa-smog"></i>',
            'Haze': '<i class="fas fa-smog"></i>',
            'Dust': '<i class="fas fa-smog"></i>',
            'Fog': '<i class="fas fa-smog"></i>',
            'Sand': '<i class="fas fa-smog"></i>',
            'Ash': '<i class="fas fa-smog"></i>',
            'Squall': '<i class="fas fa-wind"></i>',
            'Tornado': '<i class="fas fa-wind"></i>'
        };
        return icons[weatherType] || (isNight ? '<i class="fas fa-cloud-moon"></i>' : '<i class="fas fa-cloud-sun"></i>');
    }

    getEcoTip(weatherType, isNight) {
        const tips = {
            'Rain': 'Perfect day to collect rainwater for your plants! 🌱',
            'Clear': isNight ? 'Turn off unnecessary outdoor lights to reduce light pollution! 🌙' : 'Great conditions for solar energy generation! ☀️',
            'Clouds': isNight ? 'Use LED lights to save energy during the night! 💡' : 'Moderate temperature means less energy needed for cooling! 🌤',
            'Snow': 'Remember to properly insulate your home to save energy! ❄️',
            'Thunderstorm': 'Stay safe indoors and unplug electronics to save energy! ⚡',
            'Drizzle': 'Light rain is great for your garden! Consider starting one! 🌿',
            'default': isNight ? 'Save energy by dimming lights at night! 🌙' : 'Every day is a good day to be eco-friendly! 🌍'
        };
        return tips[weatherType] || tips.default;
    }

    showError() {
        console.log('Showing error state...');
        this.weatherContainer.innerHTML = `
            <div class="weather-info">
                <div class="weather-error">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Unable to fetch weather data</p>
                    <button onclick="new DynamicEcoWeather()">
                        <i class="fas fa-redo"></i> Try Again
                    </button>
                </div>
            </div>
        `;
    }
}

// Initialize weather feature when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing weather...');
    new DynamicEcoWeather();
}); 
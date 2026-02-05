const API_KEY = '4a2d14e25777469169038f9fc891dc8f';
const CURRENT_WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather';


async function getWeatherData(city = 'London') {
    try {
        const response = await fetch(`${CURRENT_WEATHER_API}?q=${city}&appid=${API_KEY}&units=metric`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
      
        
        console.log('Complete API Response:', data);
        

        console.log(`City: ${data.name}, ${data.sys.country}`);
        console.log(`Coordinates: Latitude ${data.coord.lat}, Longitude ${data.coord.lon}`);
        console.log(`Temperature: ${data.main.temp}°C (Feels like: ${data.main.feels_like}°C)`);
        console.log(`Min/Max: ${data.main.temp_min}°C / ${data.main.temp_max}°C`);
        console.log(`Weather: ${data.weather[0].main} - ${data.weather[0].description}`);
        console.log(`Humidity: ${data.main.humidity}%`);
        console.log(`Wind Speed: ${data.wind.speed} m/s`);
        console.log(`Pressure: ${data.main.pressure} hPa`);
        console.log(`Visibility: ${data.visibility} meters`);
        console.log(`Cloudiness: ${data.clouds.all}%`);
        
        return data;
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}


getWeatherData('Warrington');
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('submit-search');
    const input = document.getElementById('city-search');
    const result = document.getElementById('weatherResult');

    const submitBtn = document.getElementById('submit-btn');

    function clearError() {
        input.classList.remove('error');
    }

    function setError() {
        input.classList.add('error');
        result.style.display = 'none';
    }

    async function fetchWeather(button, cityInput) {
        const city = cityInput.value.trim();
        clearError();

        if (!city) {
            setError();
            return;
        }

        button.disabled = true;
        button.textContent = '...';

        try {
            const d = await getWeatherData(city);

            if (!d) {
                setError();
                return;
            }
            addRecord(city);
            showRecords();

            document.getElementById('wPlace').textContent = d.name + ', ' + d.sys.country;
            document.getElementById('wTime').textContent = new Date().toLocaleString();
            document.getElementById('wTemp').textContent = Math.round(d.main.temp);
            document.getElementById('wDesc').textContent = d.weather[0].description;
            document.getElementById('wFeels').textContent = Math.round(d.main.feels_like) + '°C';
            document.getElementById('wHum').textContent = d.main.humidity + '%';
            document.getElementById('wWind').textContent = Math.round(d.wind.speed * 3.6) + ' km/h';
            document.getElementById('wIcon').src = `https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`;

            result.style.display = 'block';
        } catch {
            setError();
        } finally {
            button.disabled = false;
            button.textContent = 'Get Weather';
        }
    }
    
    btn.addEventListener('click', async function () {
        fetchWeather(btn, input);
    });
    
    if (submitBtn) {
        submitBtn.addEventListener('click', async function () {
            const citySelect = document.getElementById('city-select');
            if (citySelect) {
                fetchWeather(submitBtn, citySelect);
            }
        });
    }    

    input.addEventListener('input', clearError);
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') btn.click();
    });
});


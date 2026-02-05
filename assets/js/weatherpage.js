document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('cityInput');
    const btn = document.getElementById('weatherBtn');
    const result = document.getElementById('weatherResult');

    function clearError() {
        input.classList.remove('error');
    }

    function setError() {
        input.classList.add('error');
        result.style.display = 'none';
    }

    btn.addEventListener('click', async function () {
        const city = input.value.trim();
        clearError();

        if (!city) {
            setError();
            return;
        }

        btn.disabled = true;
        btn.textContent = '...';

        try {
            const d = await getWeatherData(city);

            if (!d) {
                setError();
                return;
            }

            document.getElementById('wPlace').textContent = d.name + ', ' + d.sys.country;
            document.getElementById('wTime').textContent = new Date().toLocaleString();
            document.getElementById('wTemp').textContent = Math.round(d.main.temp);
            document.getElementById('wDesc').textContent = d.weather[0].description;
            document.getElementById('wFeels').textContent = Math.round(d.main.feels_like) + '°C';
            document.getElementById('wHum').textContent = d.main.humidity + '%';
            document.getElementById('wWind').textContent = Math.round(d.wind.speed * 3.6) + ' km/h';

            result.style.display = 'block';
        } catch {
            setError();
        } finally {
            btn.disabled = false;
            btn.textContent = 'Get Weather';
        }
    });

    input.addEventListener('input', clearError);
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') btn.click();
    });
});


const API_BASE = "https://weather-api.onrender.com"; // Render API URL

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) return alert("Enter a city");

    try {
        const res = await fetch(`${API_BASE}/weather?q=${city}`);
        const data = await res.json();
        if (data.error) {
            document.getElementById('result').innerText = data.error;
        } else {
            document.getElementById('result').innerHTML =
                `City: ${data.name}<br>
                 Temp: ${data.main.temp}°C<br>
                 Weather: ${data.weather[0].description}`;
        }
    } catch (err) {
        document.getElementById('result').innerText = "Error fetching weather";
    }
}

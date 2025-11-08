const searchBtn = document.getElementById('searchBtn');
const geoBtn = document.getElementById('geoBtn');
const cityInput = document.getElementById('cityInput');
const output = document.getElementById('output');

async function fetchWeather(query) {
  output.innerHTML = "Loading...";
  const res = await fetch(query);
  const data = await res.json();

  if (data.cod != 200) {
    output.innerHTML = `<p>❌ ${data.message}</p>`;
  } else {
    output.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <h3>${data.weather[0].description}</h3>
      <p>🌡️ Temp: ${data.main.temp}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>💨 Wind: ${data.wind.speed} m/s</p>
    `;
  }
}

searchBtn.onclick = () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(`/api/weather?q=${city}`);
};

geoBtn.onclick = () => {
  if (!navigator.geolocation) return alert("Geolocation not supported");
  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords;
    fetchWeather(`/api/weather?lat=${latitude}&lon=${longitude}`);
  });
};

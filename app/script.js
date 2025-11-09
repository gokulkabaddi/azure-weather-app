const apiBase = "https://render-weather-api-z5e1.onrender.com/weather";

document.getElementById("searchBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  resultDiv.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(`${apiBase}?q=${city}`);
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();

    resultDiv.innerHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><b>Weather:</b> ${data.weather[0].description}</p>
      <p><b>Temperature:</b> ${data.main.temp}°C</p>
      <p><b>Humidity:</b> ${data.main.humidity}%</p>
      <p><b>Wind Speed:</b> ${data.wind.speed} m/s</p>
    `;
  } catch (err) {
    resultDiv.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
  }
});

const fetch = require("node-fetch");

module.exports = async function (context, req) {
  const API_KEY = process.env.f1fe4ebad498f7c370edaa4b3fe09bda;
  const city = req.query.q;
  const lat = req.query.lat;
  const lon = req.query.lon;

  if (!API_KEY) {
    context.res = { status: 500, body: { error: "Missing API key" } };
    return;
  }

  try {
    let url;
    if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    } else if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    } else {
      context.res = { status: 400, body: { error: "Provide ?q=city or ?lat,lon" } };
      return;
    }

    const response = await fetch(url);
    const data = await response.json();
    context.res = { status: 200, body: data };
  } catch (err) {
    context.res = { status: 500, body: { error: err.message } };
  }
};

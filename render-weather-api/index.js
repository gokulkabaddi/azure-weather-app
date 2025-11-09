import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/weather", async (req, res) => {
  const city = req.query.q;
  const apiKey = "f1fe4ebad498f7c370edaa4b3fe09bda";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

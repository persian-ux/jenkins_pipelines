import { useState } from 'react';
import axios from 'axios';


const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const API_KEY = 'b3361ed0c5ace65c8ccb13ffeef7710a'; 

  const getWeather = async () => {
    if (!city) return;
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch {
      alert("City not found!");
      setWeather(null);
    }
  };

  return (
    <div className="weather-box">
      <h1 className='text-8xl underline'> Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather icon"
          />
          <p>{weather.weather[0].description}</p>
          <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;

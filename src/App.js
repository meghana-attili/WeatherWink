import React, { useState } from 'react';
import axios from 'axios';
import WeatherChart from './WeatherChart';
import './App.css';

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

function App() {
  const [city, setCity] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState('');

  // Fetch current weather
  const fetchCurrentWeather = async (cityName) => {
    try {
      setError('');
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      return response.data;
    } catch (err) {
      setError('City not found. Please try again.');
      return null;
    }
  };

  // Fetch 5-day / 3-hour forecast data
  const fetchForecastData = async (cityName) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      return response.data.list; // array of forecast items every 3 hours
    } catch (err) {
      console.error('Error fetching forecast data:', err);
      return null;
    }
  };

  const handleSearch = async () => {
    if (!city) return;
    const current = await fetchCurrentWeather(city);
    if (current) {
      setCurrentWeather(current);
      const forecast = await fetchForecastData(city);
      setForecastData(forecast);
    } else {
      setCurrentWeather(null);
      setForecastData(null);
    }
  };

  return (
    <div className="app-container p-4 max-w-4xl mx-auto">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-blue-600">WeatherWink</h1>
      </header>

      <div className="search-bar flex justify-center mb-6">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
          className="border border-gray-300 rounded-l px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {currentWeather && (
        <div className="weather-panel bg-white shadow rounded p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-2">{currentWeather.name}, {currentWeather.sys.country}</h2>

          <div className="current-weather flex items-center space-x-4 mb-4">
            <img
              alt={currentWeather.weather[0].description}
              src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
              className="w-20 h-20"
            />
            <div>
              <p className="text-5xl font-bold">{Math.round(currentWeather.main.temp)}°C</p>
              <p className="text-xl capitalize">{currentWeather.weather[0].main}</p>
            </div>
          </div>

          <div className="additional-info grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
            <div><strong>Feels like:</strong> {Math.round(currentWeather.main.feels_like)}°C</div>
            <div><strong>Humidity:</strong> {currentWeather.main.humidity}%</div>
            <div><strong>Wind Speed:</strong> {currentWeather.wind.speed} m/s</div>
            <div><strong>Sunrise:</strong> {new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString()}</div>
            <div><strong>Sunset:</strong> {new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString()}</div>
           {/* <div><strong>Rain:</strong> {currentWeather.rain ? `${currentWeather.rain['1h']} mm (last 1h)` : 'No rain'}</div> */}

          </div>
        </div>
      )}

      {forecastData && (
        <div className="forecast-chart bg-white shadow rounded p-6">
          <h3 className="text-xl font-semibold mb-4">5-Day Forecast (3-hour intervals)</h3>
          <WeatherChart data={forecastData} />
        </div>
      )}
    </div>
  );
}

export default App;
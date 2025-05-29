import React, { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(query);
      if (data.cod === "404") {
        setError("City not found. Please try again.");
        setWeather({});
      } else {
        setWeather(data);
      }
    } catch (error) {
      setError("Failed to fetch weather data. Please try again.");
      setWeather({});
    }
    setLoading(false);
    setQuery("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="main-container">
      <div className="search-container">
        <div className="search-box">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            className="search"
            placeholder="Search city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            className="search-button"
            onClick={handleSearch}
            disabled={!query.trim()}
          >
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Fetching weather data...</p>
        </div>
      )}

      {error && !loading && (
        <div className="error-container">
          <i className="fas fa-exclamation-circle error-icon"></i>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && weather.main && (
        <div className="weather-container">
          <div className="primary-info">
            <h2 className="city-name">
              <span>{weather.name}</span>
              <sup>{weather.sys.country}</sup>
            </h2>
            <div className="city-temp">
              {Math.round(weather.main.temp)}
              <sup>&deg;C</sup>
            </div>
            <div className="weather-description">
              <img
                className="city-icon"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <p>{weather.weather[0].description}</p>
            </div>
          </div>

          <div className="weather-details-grid">
            <div className="weather-detail">
              <span className="label">Feels Like</span>
              <span className="value">
                {Math.round(weather.main.feels_like)}°C
              </span>
            </div>
            <div className="weather-detail">
              <span className="label">Min/Max</span>
              <span className="value">
                {Math.round(weather.main.temp_min)}°C /{" "}
                {Math.round(weather.main.temp_max)}°C
              </span>
            </div>
            <div className="weather-detail">
              <span className="label">Humidity</span>
              <span className="value">{weather.main.humidity}%</span>
            </div>
            <div className="weather-detail">
              <span className="label">Pressure</span>
              <span className="value">{weather.main.pressure} hPa</span>
            </div>
            <div className="weather-detail">
              <span className="label">Wind Speed</span>
              <span className="value">{weather.wind.speed} m/s</span>
            </div>
            <div className="weather-detail">
              <span className="label">Visibility</span>
              <span className="value">{weather.visibility / 1000} km</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

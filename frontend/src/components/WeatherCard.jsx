function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="Weather Icon"
      />

      <h2>
        {weather.name}, {weather.sys.country}
      </h2>

      <p className="temperature">
        {weather.main.temp}°C
      </p>

      <p>
        Feels Like: {weather.main.feels_like}°C
      </p>

      <p>
        Condition: {weather.weather[0].main}
      </p>

      <p>
        Description: {weather.weather[0].description.toUpperCase()}
      </p>

      <p>
        Humidity: {weather.main.humidity}%
      </p>

      <p>
        Wind: {weather.wind.speed} m/s
      </p>
    </div>
  );
}

export default WeatherCard;
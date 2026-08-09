function WeatherCard(props){
    return (
        <div className = "weather-card">
            
            <img
                src = {`https://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`}
                alt = "Weather Icon"
            />

            <h2>
                {props.weather.name},{props.weather.sys.country}
            </h2>

            <p className="temperature">
                {props.weather.main.temp}°C
            </p>

            <p>Feels Like: {props.weather.main.feels_like}°C</p>

            <p>Condition: {props.weather.weather[0].main}</p>

            <p>Description : {props.weather.weather[0].description.toUpperCase()}</p>

            <p>Humidity : {props.weather.main.humidity}%</p>

            <p>Wind : {props.weather.wind.speed}m/s</p>

        </div>
    );
}
export default WeatherCard;
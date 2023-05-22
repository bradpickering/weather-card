import "./WeatherCard.css";

export default function WeatherCard({ weatherData }) {
  return (
    <div className="card">
      <div className="location">
        {weatherData.state !== undefined ? (
          <h2>
            {weatherData.locationName}, {weatherData.state},{" "}
            {weatherData.sys.country}
          </h2>
        ) : (
          <h2>
            {weatherData.locationName}, {weatherData.sys.country}
          </h2>
        )}
      </div>
      <div className="weather-info">
        <h2>{weatherData.main.temp}&deg;C.</h2>
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt=""
        ></img>
        <p>{weatherData.weather[0].description}</p>
      </div>
    </div>
  );
}

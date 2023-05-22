import WeatherCard from "../components/Card/WeatherCard";
import SearchForm from "../components/Search/SearchForm";
import "./Home.css";
import { useState } from "react";

function App() {
  const [weatherData, setWeatherData] = useState([]);

  const updateWeatherData = (newWeatherData) => {
    // Retrieves the new weather data from SearchForm

    // check if the user has already looked up the weather for this location
    // if they have just replace its spot in the list with the updated info

    // finding if the weatherData for this location exists already based on the ID given by the API
    const weatherIdx = weatherData.findIndex(
      (weather) => weather.id === newWeatherData.id
    );
    if (weatherIdx === -1) {
      // if this location hasn't already been searched add it to the list
      const updatedWeatherData = [...weatherData, newWeatherData];
      setWeatherData(updatedWeatherData);
    } else {
      // update its place in the list
      const updatedWeatherData = [...weatherData];
      updatedWeatherData[weatherIdx] = newWeatherData;
      setWeatherData(updatedWeatherData);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>Weather App</h1>
      </div>
      <div className="search-container">
        <SearchForm updateWeatherData={updateWeatherData} />
      </div>
      <div className="weather-container">
        {weatherData.map((weather) => (
          <WeatherCard key={weather.id} weatherData={weather} />
        ))}
      </div>
    </div>
  );
}

export default App;

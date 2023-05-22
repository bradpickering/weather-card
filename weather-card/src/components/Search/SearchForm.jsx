import "./SearchForm.css";
import Modal from "../Modal/Modal";
import { useState } from "react";
export default function Search({ updateWeatherData }) {
  const [location, setLocation] = useState("");
  const [stateProv, setStateProv] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [locationsForModal, setLocationsForModal] = useState([]);

  const handleOpenModal = (modalState) => {
    // opens the modal when there > 1 locations resulting from the users input
    // closes the modal when a user selects a location from within the modal or manually closes the modal
    setOpenModal(modalState);
  };

  const chooseLocation = (location) => {
    // Called from the modal component when the user chooses a location from the multiple returned
    setOpenModal(false);
    getWeatherData(location);
  };

  const getWeatherData = async (location) => {
    // Gets the weather data from the given location
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${location.lat}&lon=${location.lon}&appid=${process.env.REACT_APP_API_KEY}`
    );
    const weatherData = await weatherResponse.json();
    if (weatherData.cod !== 200) {
      alert(`Unable to get weather data: ${weatherData.message}`);
      return;
    }
    weatherData["locationName"] = location.name;
    weatherData["state"] = location.state;

    // update parent list of weather data information
    updateWeatherData(weatherData);

    setCountryCode("");
    setLocation("");
    setStateProv("");
  };

  const constructAPIURL = () => {
    // Constructs the URL for the API depending on the users inputs

    // base API URL for openweathermap
    let locationURL = `http://api.openweathermap.org/geo/1.0/direct?q=${location}`;
    // append the province and country code to the location API url if it exists
    // if the country code and/or state/province name is invalid it will return all results
    if (stateProv !== "") locationURL += `,${stateProv}`;
    else locationURL += ",";
    if (countryCode !== "") locationURL += `,${countryCode}`;
    else locationURL += ",";
    // set limit to 5 (max amount of elements that can be returned from API) and append API key to URL
    locationURL += `&limit=5&appid=${process.env.REACT_APP_API_KEY}`;

    return locationURL;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const locationURL = constructAPIURL();
    const locationResponse = await fetch(locationURL);
    const locationData = await locationResponse.json();

    if (locationData.length === 0) {
      alert("Uknown Location");
      return;
    }

    if (locationData.length > 1) {
      // let the user choose a location manually if there is more than 1 resulting location from their input
      setOpenModal(true);
      setLocationsForModal(locationData);
      return;
    }

    // locationData return as a list, only need first element
    const location = locationData[0];

    getWeatherData(location);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="search-form">
          <input
            className="search"
            required
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            className="search"
            type="text"
            placeholder="Enter State/Province Code (optional)"
            value={stateProv}
            onChange={(e) => setStateProv(e.target.value)}
          />
          <input
            className="search"
            type="text"
            placeholder="Enter ISO 3166 Country Code (optional)"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
          />
          <input
            className="submit-btn"
            type="submit"
            value="Get Weather"
          ></input>
        </div>
      </form>
      {openModal && (
        <Modal
          handleOpenModal={handleOpenModal}
          locations={locationsForModal}
          chooseLocation={chooseLocation}
        />
      )}
    </div>
  );
}

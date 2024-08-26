import React, { useState } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState({
        name:"",
        temp:"Climate",
        humidity:"",
        windSpeed:"",
        weatherIconUrl:"https://cdn2.iconfinder.com/data/icons/weather-133/24/Cloud_Sun-1024.png"
  });
  const [weatherInput, setWeatherInput] = useState('');
  const [error, setError] = useState('');

  const search = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weatherInput}&appid=5fe36b192ffd1c36dffb6752bc1722b2`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const name = data.name;
      const temp = Math.floor(data.main.temp - 273.15);
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;
      const weatherType = data.weather[0].main;

      let weatherIconUrl;
      switch (weatherType) {
        case 'Thunderstorm':
          weatherIconUrl = "https://icon-library.com/images/thunderstorm-icon/thunderstorm-icon-19.jpg";
          break;
        case 'Drizzle':
          weatherIconUrl = "https://cdn0.iconfinder.com/data/icons/perfico-weather/64/cloud_drizzle-512.png";
          break;
        case 'Rain':
          weatherIconUrl = "https://cdn3.iconfinder.com/data/icons/picons-weather/57/15_heavy_rain-512.png";
          break;
        case 'Snow':
          weatherIconUrl = "https://cdn4.iconfinder.com/data/icons/weather-132/100/snow-512.png";
          break;
        case 'Mist':
          weatherIconUrl = "https://png.pngtree.com/png-vector/20220621/ourmid/pngtree-mist-cloud-fog-foggy-clouds-png-image_5246446.png";
          break;
        case 'Clear':
          weatherIconUrl = "https://cdn1.iconfinder.com/data/icons/weather-set2-2/64/Clear-1024.png";
          break;
        case 'Clouds':
          weatherIconUrl = "https://cdn1.iconfinder.com/data/icons/hawcons/32/700118-icon-20-clouds-1024.png";
          break;
        default:
          weatherIconUrl = "https://cdn2.iconfinder.com/data/icons/weather-133/24/Cloud_Sun-1024.png";
      }

      setWeatherData({
        name,
        temp,
        humidity,
        windSpeed,
        weatherIconUrl
      });
      setError('');
    } catch (error) {
      setError('Error fetching weather data. Please try again later.');
      setWeatherData(null);
    }
  };

  return (
    <div className='container-fluid justify-content-center d-flex align-items-center' style={{ backgroundImage:`url("https://giffiles.alphacoders.com/220/220125.gif")`, height: "100vh" }}>
      <div style={{ backgroundColor: "black", width: "500px", height: "600px" }} className='rounded-3 shadow p-5'>
        <div className='d-flex justify-content-center align-items-center'>
          <input
            type="text"
            className='form-control w-75'
            placeholder='Search'
            id="weather"
            value={weatherInput}
            onChange={(e) => setWeatherInput(e.target.value)}
          />
          <button className='rounded-circle ms-2' onClick={search}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div id='result' >
          {error && <div className='text-light'>{error}</div>}
          {weatherData && (
            <div className='d-flex flex-column justify-content-between align-items-center text-light'>
              <img src={weatherData.weatherIconUrl} alt="Weather Icon" width="150" height="150" />
              <h1>{weatherData.temp}°C</h1>
              <h3>{weatherData.name}</h3>
              <div className='d-flex w-100 mt-4 justify-content-between'>
                <div className='mt-5'>
                  <h4 className=''><i className="fa-solid fa-water me-2"></i>{weatherData.humidity}%</h4>
                  <h5>Humidity</h5>
                </div>
                <div className='mt-5'>
                  <h4 className=''><i className="fa-solid fa-wind me-2"></i>{weatherData.windSpeed} km/h</h4>
                  <h5>Wind Speed</h5>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
import { useEffect, useState } from 'react';
import countriesService from "../services/countriesService";

const Capital = ({ name, capital, area }) => {
  return (
    <div>
      <h1>{name}</h1>
      {capital}
      <br />
      Area {area}
    </div>
  );
};

const Languages = ({ country }) => {
  return (
    <div>
      <h2>Languages</h2>
      <ul>
      {Object.values(country.languages).map(language => 
        <li key={language}>{language}</li>
      )}
      </ul>
    </div>
  );
};

const Flag = ({ flag }) => {
  return (
    <div>
      <img src={flag.png} alt="country flag" />
    </div>
  );
};

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countriesService
      .getWeather(capital)
      .then(weatherData => {
        setWeather(weatherData);
      });
  }, [capital]);

  if (!weather) return <div>Loading....</div>;
  
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>Tempature {weather.main.temp} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  );
};

const Country = ({ country }) => {
  return (
    <div>
      <Capital
        name={country.name.common}
        capital={country.capital[0]}
        area={country.area}
      />
      <Languages country={country}/>
      <Flag flag={country.flags}/>
      <Weather capital={country.capital} />
    </div>
  );
};

export default Country;
import axios from 'axios';
const countryUrl = 'https://studies.cs.helsinki.fi/restcountries/api';
const api_key = import.meta.env.VITE_SOME_KEY;
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

const getAll = () => {
  const request = axios.get(`${countryUrl}/all`);
  return request.then(response => response.data);
};

const getWeather = (capital) => {
  const request = axios.get(`${weatherUrl}${capital}&appid=${api_key}&units=metric`);
  return request.then(response => response.data);
};

export default {
  getAll,
  getWeather,
};
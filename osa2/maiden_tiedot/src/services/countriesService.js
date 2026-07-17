import axios from 'axios';
const url = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAll = () => {
  const request = axios.get(`${url}/all`);
  return request.then(response => response.data);
};

export default {
  getAll,
};
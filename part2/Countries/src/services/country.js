import axios from "axios";
const api_key = import.meta.env.VITE_SOME_KEY;
const baseUrl = `https://studies.cs.helsinki.fi/restcountries`;
const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${api_key}`;

const getAllCountries = () => {
  const request = axios.get(baseUrl + "/api/all");
  return request.then((response) => response.data);
};

const getCountry = (countryName) => {
  const request = axios.get(baseUrl + `/api/name/${countryName}`);
  return request.then((response) => response.data);
};

const getCountryWeather = (countryName) => {
  const request = axios.get(weatherUrl + `&q=${countryName}&aqi=no`);
  return request.then((response) => response.data);
};

export default { getAllCountries, getCountry, getCountryWeather };

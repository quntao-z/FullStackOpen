import { useState, useEffect } from "react";
import countryService from "../services/country";

const CountryInformation = ({ country }) => {
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    Promise.all([countryService.getCountry(country), countryService.getCountryWeather(country)]).then(
      ([countryInfoData, countryWeatherData]) => {
        const countryName = countryInfoData.name.common;
        const capital = countryInfoData.capital;
        const area = countryInfoData.area;
        const languages = Object.values(countryInfoData.languages);
        const flagImage = countryInfoData.flags.png;
        const temperatureC = countryWeatherData.current.temp_c;
        const temperatureF = countryWeatherData.current.temp_f;
        const conditionImage = countryWeatherData.current.condition.icon;
        const windKPH = countryWeatherData.current.wind_kph;
        const windMPH = countryWeatherData.current.wind_mph;

        setCountryData(
          <div>
            <h1>{countryName}</h1>
            <div>capital {capital}</div>
            <div>area {area}</div>
            <div></div>
            <h3>languages</h3>
            <ul>
              {languages.map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
            <img src={flagImage} />
            <h3>Weather in {capital}</h3>
            <div>
              temperature: {temperatureC}°C / {temperatureF}°F
            </div>
            <img src={conditionImage} />
            <div>
              wind {windKPH} kph / {windMPH} mph
            </div>
          </div>,
        );
      },
    );
  }, []);

  return <div>{countryData}</div>;
};

export default CountryInformation;

import React, { useState, useEffect } from 'react';
import countryService from '../services/country';

const Country = ({ filterCountryList }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (filterCountryList.length > 10) {
      setContent(<div>Too many matches, specify another filter</div>);
    } else if (filterCountryList.length === 1) {
      countryService.getCountry(filterCountryList[0])
        .then(response => {
          const countryName = response.name.common;
          const capital = response.capital;
          const area = response.area;
          const languages = Object.values(response.languages);
          setContent(
          <div>
              <h1>{countryName}</h1>
              <div>capital {capital}</div>
              <div>area {area}</div>
              <div></div>
              <h2>languages</h2>
              <ul>
                {languages.map((language, index) => (
                  <li key={index}>{language}</li>
                ))}
            </ul>
            </div>);
        })
    } else {
      const countries = filterCountryList.map((country, index) => (
        <div key={index}>{country}</div>
      ));
      setContent(countries);
    }
  }, [filterCountryList]); // Re-run effect when filterCountryList changes

  return <div>{content}</div>;
};

export default Country;

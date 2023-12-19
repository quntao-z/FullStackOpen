import React, { useState, useEffect } from 'react';
import ShowCountryButton from './ShowCountryButton'
import "../App.css"

const Country = ({ filterCountryList }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (filterCountryList.length === 250) {
      setContent(<div>Please enter a country</div>)
    }
    else if (filterCountryList.length > 10) {
      setContent(<div>Too many matches, specify another filter</div>);
    } else {
      const countries = filterCountryList.map((country, index) => (
        <div className='country-container'>
          <div key={index}>{country}</div>
          <ShowCountryButton country={country}/>
        </div>
      ));
      setContent(countries);
    }
  }, [filterCountryList]); 

  return <div>{content}</div>;
};

export default Country;

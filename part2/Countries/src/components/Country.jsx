import React, { useState, useEffect } from "react";
import ShowCountryButton from "./ShowCountryButton";
import CountryInformation from "./CountryInformation";
import "../App.css";

const Country = ({ filterCountryList, searchValue }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (searchValue === "") {
      setContent(<div>Please enter a country</div>);
    } else if (filterCountryList.length === 0) {
      setContent(<div>{searchValue}'s data does not exist</div>);
    } else if (filterCountryList.length > 10) {
      setContent(<div>Too many matches, specify another filter</div>);
    } else if (filterCountryList.length === 1) {
      setContent(<CountryInformation country={filterCountryList[0]} />);
    } else {
      const countries = filterCountryList.map((country, index) => (
        <div className="country-container">
          <div key={index}>{country}</div>
          <ShowCountryButton country={country} />
        </div>
      ));
      setContent(countries);
    }
  }, [filterCountryList]);

  return <div>{content}</div>;
};

export default Country;

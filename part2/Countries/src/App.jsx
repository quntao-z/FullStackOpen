import { useEffect, useState } from "react";
import countryService from "./services/country";
import Country from "./components/Country";

const App = () => {
  const [allCountriesList, setAllCountriesList] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");
  const [filterCountryList, setFilterCountryList] = useState([]);

  useEffect(() => {
    countryService.getAllCountries().then((response) => {
      let countriesList = [];
      response.forEach((country) => (countriesList = countriesList.concat(country.name.common)));
      setAllCountriesList(countriesList);
    });
  }, []);

  const handleCountriesChange = (event) => {
    setSearchCountries(event.target.value);
    filteredCountryList(event.target.value);
  };

  const filteredCountryList = (inputCountry) => {
    let countryList = allCountriesList.filter((country) => country.toLowerCase().includes(inputCountry.toLowerCase()));

    setFilterCountryList(countryList);
  };

  return (
    <div>
      <div>
        find countries
        <input onChange={(e) => handleCountriesChange(e)} />
        <Country filterCountryList={filterCountryList} searchValue={searchCountries} />
      </div>
    </div>
  );
};

export default App;

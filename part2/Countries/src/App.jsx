import { useEffect, useState } from "react";
import countryService from "./services/country"
import Country from "./components/Country";

const App = () => {
  const [allCountriesList, setAllCountriesList] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");


  useEffect(() => {
    countryService.getAllCountries().then((response) => {
      let countriesList = [];
      response.forEach((country) => (countriesList = countriesList.concat(country.name.common)));
      setAllCountriesList(countriesList);
    });
  }, []);

  const handleCountriesChange = (event) => {
    setSearchCountries(event.target.value);
  };

  const filterCountry = () => {
    const filteredList = allCountriesList.filter(country =>
        country.toLowerCase().includes(searchCountries.toLowerCase())
    );
    return filteredList;
  };

  return (
    <div>
      <div>
        find countries
        <input value={searchCountries} onChange={(e) => handleCountriesChange(e)} />
        <Country filterCountryList={filterCountry()}/>
      </div>
    </div>
  );
};

export default App;

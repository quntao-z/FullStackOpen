import { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = `https://studies.cs.helsinki.fi/restcountries/`

const App = () => {
    const [allCountriesList, setAllCountriesList] = useState([]);
    const [searchCountries, setSearchCountries] = useState("");

    const getAllCountries = () => {
        const request = axios.get(baseUrl + '/api/all');
        return request.then((response) => response.data)
    }

    useEffect(()=> {
        getAllCountries().then(response => {
            let CountriesList = []
            response.forEach(country => CountriesList = CountriesList.concat(country.name.common))
            setAllCountriesList(allCountriesList)
        })
    }, [])

    const handleCountriesChange = (event) => {
        setSearchCountries(event.target.value)
    }

    const countriesFilter = () => {
        let countryFilterList = []
        console.log(allCountriesList)
        allCountriesList.forEach(country=> countryFilterList = countryFilterList.concat(country.includes(searchCountries)))
        console.log(countryFilterList)
        return countryFilterList
    }

    return(
        <div>
        <div>find countries
            <input value={searchCountries} onChange={(e) => handleCountriesChange(e)} />
            {countriesFilter() > 10? (
                <div>
                <div>Too many matches, specify another filter </div>
                </div>
            ) : null}
        </div>
        </div>
    );
}

export default App;
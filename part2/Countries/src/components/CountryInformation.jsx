import { useState, useEffect } from 'react';
import countryService from '../services/country';

const CountryInformation = (country) => {
    const [countryData, setCountryData] = useState(null)
   
    useEffect(() => {countryService.getCountry(country.country.country)
        .then(response => {
            const countryName = response.name.common;
            const capital = response.capital;
            const area = response.area;
            const languages = Object.values(response.languages);
            const flagImage = response.flags.png;

            setCountryData (
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
                    <img src={flagImage}/>
                </div>)
    })})

    return (
        <div>
            {countryData}
        </div>
    )
}

export default CountryInformation;
import { useState } from "react";
import CountryInformation from "./CountryInformation";

const ShowCountryButton = ({ country }) => {
  const [showCountryData, setShowCountryData] = useState(false);

  const handleShowCountryData = () => {
    setShowCountryData(!showCountryData);
  };

  return (
    <div>
      <button onClick={handleShowCountryData}>Show</button>
      <div>{showCountryData && <CountryInformation country={country} />}</div>
    </div>
  );
};

export default ShowCountryButton;

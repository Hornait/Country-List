import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./AboutCountry.css"
import axios from "axios";
import CountryInfo from "../../components/CountryInfo";

function AboutCountry() {

  const { indexCountry } = useParams();
  const [country, setCountry] = useState(null);
  const [showInfoAboutCountry, setShowInfoAboutCountry] = useState(true)
  const [showCountryMap, setShowCountryMap] = useState(false)
  let showDiv
  useEffect(() => {
    async function fetchCountry() {
      try {
        const response = await axios(
          `https://restcountries.com/v3.1/alpha/${indexCountry}`
        );
        setCountry(response.data[0]);
      } catch {
        setCountry("Error");
      }
    }
    fetchCountry();
  }, [indexCountry]);

  if (!country) {
    return <div className="dad">Loading...</div>;
  }
  if (country === "Error") {
    return <div className="dad">There was an error loading the country.</div>;
  }

  if (showInfoAboutCountry){
    showDiv = <CountryInfo chosenCountry={country}></CountryInfo>
  }

  return (
    <>
      <div className="buttons">
        <Link className="goBack" to="/"><button className="button_">Back to list</button></Link>
        <button onClick={() => {setShowCountryMap(false); setShowInfoAboutCountry(true)}} className={showInfoAboutCountry? "button_ active":'button_'}>Information about country</button>
      </div>
      {showDiv}
    </>
  );
}

export default AboutCountry;

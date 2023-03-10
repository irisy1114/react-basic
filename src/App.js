import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Country from './components/Country';
import NewCountry from './components/NewCountry';

const App = () => {
  const [ countries, setCountries ] = useState([]);
  // const apiEndpoint = "https://localhost:5001/api/country";
  const apiEndpoint = "https://olympicmedals.azurewebsites.net/api/country";

  useEffect( () => {
    async function fetchData() {
      const { data: fetchedCountries } = await axios.get(apiEndpoint);
      setCountries(fetchedCountries);
    }
    fetchData();
  }, []);
  const increaseMedalCount = (countryId, medalName) => {
    // look for country and medal name
    // const countriesMutable = [...countries];
    // const idx = countriesMutable.findIndex((c) => c.id === countryId)
    // countriesMutable[idx][medalName] += 1;
    // setCountries(countriesMutable);
  }

  const decreaseMedalCount = (countryId, medalName) => {
    // const countriesMutable = [...countries];
    // const idx = countriesMutable.findIndex((c) => c.id === countryId)
    // countriesMutable[idx][medalName] -= 1;
    // setCountries(countriesMutable);
  }

  const getTotalMedalCount = () => {
    // return countries.reduce((a, b) => a + b.gold + b.silver + b.bronze, 0);
  }
  const addNewCountry = async (countryName, gold, silver, bronze) => {
    const { data: post } = await axios.post(apiEndpoint, { name: countryName, gold: gold, silver: silver, bronze: bronze});
    setCountries(countries.concat(post));
  }
  const deleteCountry = async (countryId) => {
    const originalCountries = countries;
    setCountries(countries.filter(c => c.id !== countryId));
    try {
      await axios.delete(`${apiEndpoint}/${countryId}`);
    } catch(ex) {
      if (ex.response && ex.response.status === 404) {
        // word already deleted
        console.log("The record does not exist - it may have already been deleted");
      } else { 
        alert('An error occurred while deleting a word');
        setCountries(originalCountries);
      }
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <h3>Olympic Medals
          <span className="badge">{ getTotalMedalCount() }</span>
        </h3>
      </div>
      { countries.map(country => 
        <Country 
          key={ country.id } 
          country={ country } 
          id={ country.id }
          name={ country.name }
          gold={ country.gold}
          silver={ country.silver}
          bronze={ country.bronze}
          onIncrement={ increaseMedalCount}
          onDecrement={ decreaseMedalCount }     
          onDelete={ deleteCountry } 
        />) }
        <NewCountry onAdd={ addNewCountry }/>
    </div>  
            
    );
}

export default App;

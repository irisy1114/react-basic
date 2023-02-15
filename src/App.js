import React, { useState, useEffect } from 'react';
import './App.css';
import Country from './components/Country';
import NewCountry from './components/NewCountry';

const App = () => {
  const [ countries, setCountries ] = useState([]);

  useEffect( () => {
    let mutableCountries = [
      { id: 1, name: 'United States', gold: 2 , silver: 2, bronze: 3 },
      { id: 2, name: 'China', gold: 3, silver: 1, bronze: 0 },
      { id: 3, name: 'Germany', gold: 0, silver: 2, bronze: 2 },  
    ]
    setCountries(mutableCountries);
  }, []);
  const increaseMedalCount = (countryId, medalName) => {
    // look for country and medal name
    const countriesMutable = [...countries];
    const idx = countriesMutable.findIndex((c) => c.id === countryId)
    countriesMutable[idx][medalName] += 1;
    setCountries(countriesMutable);
  }

  const decreaseMedalCount = (countryId, medalName) => {
    const countriesMutable = [...countries];
    const idx = countriesMutable.findIndex((c) => c.id === countryId)
    countriesMutable[idx][medalName] -= 1;
    setCountries(countriesMutable);
  }

  const getTotalMedalCount = () => {
    // const countriesMutable = [...countries];
    return countries.reduce((a, b) => a + b.gold + b.silver + b.bronze, 0);
  }
  const addNewCountry = (name) => {
    const id = countries.length === 0 ? 1 : Math.max(...countries.map(country => country.id)) + 1;
    const mutableCountries = countries.concat({ id: id, name: name, gold: 0, silver: 0, bronze: 0 });
    setCountries(mutableCountries);
  }
  const deleteCountry = (countryId) => {
    const mutableCountries = countries.filter(c => c.id !== countryId);
    setCountries( mutableCountries);  
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

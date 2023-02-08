import React, { Component } from 'react';
import './App.css';
import Country from './components/Country';
import NewCountry from './components/NewCountry';

class App extends Component {
  state = {
    countries: [
      { id: 1, name: 'United States', gold: 2 , silver: 2, bronze: 3 },
      { id: 2, name: 'China', gold: 3, silver: 1, bronze: 0 },
      { id: 3, name: 'Germany', gold: 0, silver: 2, bronze: 2 },    
    ]
  }

  increaseMedalCount = (countryId, medalName) => {
    // look for country and medal name
    const countriesMutable = [...this.state.countries];
    const idx = countriesMutable.findIndex((c) => c.id === countryId)
    countriesMutable[idx][medalName] += 1;
    this.setState({ countries: countriesMutable });
  }

  decreaseMedalCount = (countryId, medalName) => {
    const countriesMutable = [...this.state.countries];
    const idx = countriesMutable.findIndex((c) => c.id === countryId)
    countriesMutable[idx][medalName] -= 1;
    this.setState({ countries: countriesMutable });
  }

  getTotalMedalCount() {
    // const countriesMutable = [...this.state.countries];
    return this.state.countries.reduce((a, b) => a + b.gold + b.silver + b.bronze, 0);
  }
  addNewCountry = (name) => {
    const { countries } = this.state;
    const id = countries.length === 0 ? 1 : Math.max(...countries.map(country => country.id)) + 1;
    const mutableCountries = countries.concat({ id: id, name: name, gold: 0, silver: 0, bronze: 0 });
    this.setState({ countries:mutableCountries });
  }
  deleteCountry = (countryId) => {
    const { countries } = this.state;
    const mutableCountries = countries.filter(c => c.id !== countryId);
    this.setState({ countries:mutableCountries});  
  }

  render() { 
    return (
      <div className="App">
        <div className="App-header">
          <h3>Olympic Medals
            <span className="badge">{ this.getTotalMedalCount() }</span>
          </h3>
        </div>
        { this.state.countries.map(country => 
          <Country 
            key={ country.id } 
            country={ country } 
            id={ country.id }
            name={ country.name }
            gold={ country.gold}
            silver={ country.silver}
            bronze={ country.bronze}
            onIncrement={ this.increaseMedalCount}
            onDecrement={ this.decreaseMedalCount }     
            onDelete={ this.deleteCountry } 
          />) }
          <NewCountry onAdd={ this.addNewCountry }/>
      </div>  
              
     );
  }
}

export default App;

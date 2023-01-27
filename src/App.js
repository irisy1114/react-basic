import React, { Component } from 'react';
import './App.css';
import Country from './components/Country';

class App extends Component {
  state = {
    countries: [
      { id: 1, name: 'United States', goldMedalCount: 2 },
      { id: 2, name: 'China', goldMedalCount: 3 },
      { id: 3, name: 'Germany', goldMedalCount: 0 },    
    ]
  }

  render() { 
    return (
      <div className="App">
        { this.state.countries.map(country => 
          <Country 
            key={ country.id } 
            country={ country } 
            onIncrement={ this.handleIncrement}
            onDecrement={ this.handleDecrement }      
          />) }
      </div>          
     );
  }
}

export default App;

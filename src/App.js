import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';
import { HubConnectionBuilder } from '@microsoft/signalr';
import Country from './components/Country';
import NewCountry from './components/NewCountry';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const apiEndpoint = "https://localhost:5001/api/country";
  const hubEndpoint = "https://localhost:5001/medalsHub"
  // const apiEndpoint = "https://olympicmedals.azurewebsites.net/api/country";
  // const hubEndpoint = "https://medalsapi.azurewebsites.net/medalsHub"
  const [ connection, setConnection] = useState(null);
  // const medals = useRef([
  //   { id: 1, name: 'gold' },
  //   { id: 2, name: 'silver' },
  //   { id: 3, name: 'bronze' },
  // ]);

  const latestCountries = useRef(null);
  // latestCountries.current is a ref variable to countries
  // this is needed to access state variable in useEffect w/o dependency
  latestCountries.current = countries;

  // this is the functional equivalent to componentDidMount
  useEffect(() => {
    // initial data loaded here
    async function fetchData() {
      const { data: fetchedCountries } = await axios.get(apiEndpoint);
      setCountries(fetchedCountries);
    }
    fetchData();

    // signalR
    const newConnection = new HubConnectionBuilder()
      .withUrl(hubEndpoint)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  // componentDidUpdate (changes to connection)
  useEffect(() => {
    if (connection) {
      connection.start()
      .then(() => {
        console.log('Connected!')

        connection.on('ReceiveAddMessage', country => {
          console.log(`Add: ${country.name}`);
          let mutableCountries = [...latestCountries.current];
          mutableCountries = mutableCountries.concat(country);

          setCountries(mutableCountries);
        });

        connection.on('ReceiveDeleteMessage', id => {
          console.log(`Delete id: ${id}`);
          let mutableCountries = [...latestCountries.current];
          mutableCountries = mutableCountries.filter(c => c.id !== id);

          setCountries(mutableCountries);
        });

        connection.on('ReceivePatchMessage', country => {
          console.log(`Patch: ${country.name}`);
          let mutableCountries = [...latestCountries.current];
          const idx = mutableCountries.findIndex(c => c.id === country.id);
          mutableCountries[idx] = country;

          setCountries(mutableCountries);
        });
      })
      .catch(e => console.log('Connection failed: ', e));
    }
  // useEffect is dependent on changes connection
  }, [connection]);

  const increaseMedalCount = (countryId, medalName) => handleUpdate(countryId, medalName, 1);
  const decreaseMedalCount = (countryId, medalName) => handleUpdate(countryId, medalName, -1)
  const handleUpdate = async (countryId, medalName, factor) => {
    const originalCountries = countries;
    const idx = countries.findIndex(c => c.id === countryId);
    const mutableCountries = [...countries];
    mutableCountries[idx][medalName] += (1 * factor);
    setCountries(mutableCountries);
    const jsonPatch = [{ op: "replace", path: medalName, value: mutableCountries[idx][medalName] }];
    console.log(`json patch for id: ${countryId}: ${JSON.stringify(jsonPatch)}`);

    try {
      await axios.patch(`${apiEndpoint}/${countryId}`, jsonPatch);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        // country already deleted
        console.log("The record does not exist - it may have already been deleted");
      } else { 
        alert('An error occurred while updating');
        setCountries(originalCountries);
      }
    }
  }

    const getTotalMedalCount = () => {
      return countries.reduce((a, b) => a + b.gold + b.silver + b.bronze, 0);
    }
    const addNewCountry = async (name) => {
      await axios.post(apiEndpoint, { name: name});
    }
    const deleteCountry = async (countryId) => {
      const originalCountries = countries;
      setCountries(countries.filter(c => c.id !== countryId));
      try {
        await axios.delete(`${apiEndpoint}/${countryId}`);
      } catch (ex) {
        if (ex.response && ex.response.status === 404) {
          // word already deleted
          console.log("The record does not exist - it may have already been deleted");
        } else {
          alert('An error occurred while deleting');
          setCountries(originalCountries);
        }
      }
    }

    return (
      <div className="App">
        <div className="App-header">
          <h3>Olympic Medals
            <span className="badge">{getTotalMedalCount()}</span>
          </h3>
        </div>
        {countries.map(country =>
          <Country
            key={country.id}
            country={country}
            id={country.id}
            name={country.name}
            gold={country.gold}
            silver={country.silver}
            bronze={country.bronze}
            onIncrement={increaseMedalCount}
            onDecrement={decreaseMedalCount}
            onDelete={deleteCountry}
          />)}
        <NewCountry onAdd={addNewCountry} />
      </div>

    );
  }

  export default App;

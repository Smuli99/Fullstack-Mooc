import { useEffect, useState } from 'react';
import countriesService from './services/countriesService';
import Country from './components/Country';

const App = () => {
  const [countries, setCountries] = useState(null);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    countriesService
      .getAll()
      .then(initialData => {
        setCountries(initialData);
      });
  }, []);

  // nothing on render
  if (!countries) {
    return <div>Loading...</div>;
  }

  const filteredCountries = countries.filter(country =>
    country.name.common
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  return (
    <div>
      find countries
      <input onChange={(event) => setSearch(event.target.value)}></input>

      {filteredCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
        filteredCountries.map(country =>
          <p key={country.name.common}>{country.name.common}</p>
        )
      )}

      {filteredCountries.length === 1 && (
       <Country country={filteredCountries[0]}/>
      )}
    </div>
  );
};

export default App;
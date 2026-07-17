const Capital = ({ name, capital, area }) => {
  return (
    <div>
      <h1>{name}</h1>
      {capital}
      <br />
      Area {area}
    </div>
  );
};

const Languages = ({ country }) => {
  return (
    <div>
      <h2>Languages</h2>
      <ul>
      {Object.values(country.languages).map(language => 
        <li key={language}>{language}</li>
      )}
      </ul>
    </div>
  );
};

const Flag = ({ flag }) => {
  return (
    <div>
      <img src={flag.png} alt="country flag" />
    </div>
  );
};

const Country = ({ country }) => {
  return (
    <div>
      <Capital
        name={country.name.common}
        capital={country.capital[0]}
        area={country.area}
      />
      <Languages country={country}/>
      <Flag flag={country.flags}/>
    </div>
  );
};

export default Country;
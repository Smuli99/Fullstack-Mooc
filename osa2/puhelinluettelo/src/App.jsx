import { useState } from "react";
import AddNew from "./components/AddNew";
import Numbers from "./components/Numbers";
import Phonebook from "./components/Phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const filteredPersons = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const nameTaken = () => {
    return persons.some(person => 
      person.name.toLowerCase() === newName.toLowerCase()
    );
  };

  const addNewPerson = (event) => {
    event.preventDefault();

    if (nameTaken()) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }
    
    const personObject = {
      name: newName.trim(),
      number: newNumber.trim(),
    };

    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  };

  return (
    <div>
      <Phonebook
        filter={filter}
        handleNewFilter={(event) => setFilter(event.target.value)}
      />
      <AddNew
        addNewPerson={addNewPerson}
        newName={newName}
        handleNewName={(event) => setNewName(event.target.value)}
        newNumber={newNumber}
        handleNewNumber={(event) => setNewNumber(event.target.value)}
      />
      <Numbers
        persons={filteredPersons}
      />
    </div>
  );
};

export default App;
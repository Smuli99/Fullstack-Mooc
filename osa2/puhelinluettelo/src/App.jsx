import { useState } from "react";
import AddNew from "./components/AddNew";
import Numbers from "./components/Numbers";
import Phonebook from "./components/Phonebook";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
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
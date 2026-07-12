import { useState } from "react";
import Phonebook from "./components/Phonebook";
import Numbers from "./components/Numbers";

const App = () => {
  const [persons, setPersons] = useState([{name: 'Arto Hellas'}]);
  const [newName, setNewName] = useState('');

  const addNewPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
    };

    setPersons(persons.concat(personObject));
    setNewName('');
  };

  return (
    <div>
      <Phonebook
        addNewPerson={addNewPerson}
        newName={newName}
        handleNewName={(event) => setNewName(event.target.value)}
      />
      <Numbers
        persons={persons}
      />
    </div>
  );
};

export default App;
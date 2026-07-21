import { useEffect, useState } from "react";
import personService from './services/persons';

import NewPerson from "./components/NewPerson";
import Numbers from "./components/Numbers";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

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
      if (!window.confirm(
        `${newName} is already added to phonebook, replace the old number with new one?`
      )) return;

      const personToUpdate = persons.find(p => 
        p.name.toLowerCase().trim() === newName.toLowerCase().trim()
      );

      const updatedPerson = { ...personToUpdate, number: newNumber.trim() };
      const id = updatedPerson.id;

      personService
        .update(id, updatedPerson)
        .then(returnedObject => {
          setPersons(persons.map(p =>
            p.id === id ? returnedObject : p
          ));
        })
        .catch(error => {
          setNotification({
            message: error.response.data.error,
            type: 'error',
          });
          setTimeout(() => setNotification(null), 3000);
          console.log(error);
        });

      setNewName('');
      setNewNumber('');

      setNotification({
        message: `Updated ${updatedPerson.name}`,
        type: 'success'
      });
      setTimeout(() => setNotification(null), 3000);

      return;
    }
    
    const personObject = {
      name: newName.trim(),
      number: newNumber.trim(),
    };

    personService
      .create(personObject)
      .then(returnedObject => {
        setPersons(persons.concat(returnedObject));
        setNewName('');
        setNewNumber('');

        setNotification({
          message: `Added ${returnedObject.name}`,
          type: 'success'
        });
        setTimeout(() => setNotification(null), 3000);
      })
      .catch(error => {
        setNotification({
          message: error.response.data.error,
          type: 'error'
        });
        setTimeout(() => setNotification(null), 3000);
      });
  };

  const removePerson = (id) => {
    const personToRemove = persons.find(p => p.id === id);
    if (!window.confirm(`Delete ${personToRemove.name} ?`)) return;
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id));
        setNotification({
          message: `Removed ${personToRemove.name}`,
          type: 'success'
        });
        setTimeout(() => setNotification(null), 3000);
      })
      .catch(error => {
        setNotification({
          message: `Information of ${personToRemove.name} has already been removed from server`,
          type: 'error'
        });
        setTimeout(() => setNotification(null), 3000);
        console.log(error);
      });
  };

  return (
    <div>
      <Filter
        filter={filter}
        handleNewFilter={(event) => setFilter(event.target.value)}
        notification={notification}
      />
      <Notification notification={notification} />
      <NewPerson
        addNewPerson={addNewPerson}
        newName={newName}
        handleNewName={(event) => setNewName(event.target.value)}
        newNumber={newNumber}
        handleNewNumber={(event) => setNewNumber(event.target.value)}
      />
      <Numbers
        persons={filteredPersons}
        handleRemove={removePerson}
      />
    </div>
  );
};

export default App;
import Person from "./Person";

const Numbers = ({ persons, handleRemove }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map(person =>
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          handleRemove={() => handleRemove(person.id)}
        />
      )}
    </div>
  );
};

export default Numbers;
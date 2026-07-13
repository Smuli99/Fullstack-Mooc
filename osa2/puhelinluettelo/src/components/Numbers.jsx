import SubHeader from "./SubHeader";
import Person from "./Person";

const Numbers = ({ persons }) => {
  return (
    <div>
      <SubHeader text="Numbers" />
      {persons.map(person =>
        <Person
          key={person.name}
          name={person.name}
        />
      )}
    </div>
  );
};

export default Numbers;
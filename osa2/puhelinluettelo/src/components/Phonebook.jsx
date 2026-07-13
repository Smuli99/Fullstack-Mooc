import SubHeader from "./SubHeader";
import Form from "./Form";

const Phonebook = ({ addNewPerson, newName, handleNewName, newNumber, handleNewNumber }) => {
  return (
    <div>
      <SubHeader text="Phonebook" />
      <Form
        onSubmit={addNewPerson}
        nameText={newName}
        handleName={handleNewName}
        numberText={newNumber}
        handleNumber={handleNewNumber}
        buttonType="submit"
        buttonText="add"
      />
    </div>
  );
};

export default Phonebook;
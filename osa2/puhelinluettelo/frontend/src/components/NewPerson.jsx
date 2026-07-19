import Form from "./Form";

const NewPerson = ({ addNewPerson, newName, handleNewName, newNumber, handleNewNumber }) => {
  return (
    <div>
      <h2>Add new</h2>
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

export default NewPerson;
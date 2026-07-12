import SubHeader from "./SubHeader";
import Form from "./Form";

const Phonebook = ({ addNewPerson, newName, handleNewName }) => {
  return (
    <div>
      <SubHeader text="Phonebook" />
      <Form
        onSubmit={addNewPerson}
        inputText={newName}
        handleInput={handleNewName}
        buttonType="submit"
        buttonText="add"
      />
    </div>
  );
};

export default Phonebook;
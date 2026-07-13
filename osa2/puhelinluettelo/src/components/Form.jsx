import Input from "./Input";

const Form = ({ onSubmit, nameText, handleName, numberText, handleNumber }) => {
  return (
    <form onSubmit={onSubmit}>
      <Input
        text="name:"
        value={nameText}
        id="name"
        name="name"
        handleText={handleName}
      />
      <Input
        text="number:"
        value={numberText}
        id="number"
        name="number"
        handleText={handleNumber}
      />
      <button type="submit">add</button>
    </form>
  );
};

export default Form;
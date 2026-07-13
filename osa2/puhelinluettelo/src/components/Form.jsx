import Input from "./Input";
import Button from "./Button";

const Form = ({ 
  onSubmit, buttonType, buttonText, nameText, 
  handleName, numberText, handleNumber
 }) => {
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
      <Button
        type={buttonType}
        text={buttonText}
      />
    </form>
  );
};

export default Form;
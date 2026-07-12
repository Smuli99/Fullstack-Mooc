import Input from "./Input";
import Button from "./Button";

const Form = ({ onSubmit, buttonType, buttonText, inputText, handleInput }) => {
  return (
    <form onSubmit={onSubmit}>
      <Input
        text={inputText}
        handleText={handleInput}
        />
      <Button
        type={buttonType}
        text={buttonText}
      />
    </form>
  );
};

export default Form;
const Input = ({ text, value, id, name, handleText }) => {
  return (
    <div>
      {text}
      <input
        value={value}
        id={id}
        name={name}
        onChange={handleText}
      />
    </div>
  );
};

export default Input;
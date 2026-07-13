const Input = ({ text, id, name, handleText }) => {
  return (
    <div>
      <input
        value={text}
        id={id}
        name={name}
        onChange={handleText}
      />
    </div>
  );
};

export default Input;
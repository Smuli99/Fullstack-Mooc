const Input = ({ text, handleText }) => {
  return (
    <div>
      <input
        value={text}
        onChange={handleText}
      />
    </div>
  );
};

export default Input;
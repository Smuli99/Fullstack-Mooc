const Person = ({ name, number, handleRemove }) => {
  return (
    <div>
      {name} {number}
      <button onClick={handleRemove}>delete</button>
    </div>
  );
};

export default Person;
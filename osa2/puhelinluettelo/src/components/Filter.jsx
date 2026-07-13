import Input from "./Input";

const Filter = ({filter, handleNewFilter}) => {
  return (
    <div>
      <h2>Phonebook</h2>
      <Input
        text="filter shown with"
        value={filter}
        id="filter"
        name="filter-search"
        handleText={handleNewFilter}
      />
    </div>
  );
};

export default Filter;
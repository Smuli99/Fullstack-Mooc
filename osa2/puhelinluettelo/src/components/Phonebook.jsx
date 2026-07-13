import SubHeader from "./SubHeader";
import Input from "./Input";

const Phonebook = ({filter, handleNewFilter}) => {
  return (
    <div>
      <SubHeader text="Phonebook" />
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

export default Phonebook;
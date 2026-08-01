const NoteForm = ({ user, onSubmit, value, onChange }) => {
  return (
    <div>
      <h2>{user} logged in</h2>
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={onChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NoteForm;
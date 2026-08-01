const LoginForm = ({
  onSubmit,
  usernameValue,
  usernameOnChange,
  passwordValue,
  passwordOnChange
}) => {
  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            username
            <input
              type='text'
              value={usernameValue}
              onChange={usernameOnChange}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type='text'
              value={passwordValue}
              onChange={passwordOnChange}
            />
          </label>
        </div>
        <button type='sumbit'>login</button>
      </form>
    </div>
  );
};

export default LoginForm;
const LoginForm = ({
  onSubmit,
  username,
  onUsernameChange,
  password,
  onPasswordChange
}) => {
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '3px'
  };

  return (
    <div>
      <h2>Login to Blog App</h2>

      <form style={formStyle} onSubmit={onSubmit}>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={onUsernameChange}
          />
        </label>
        <label>
          password
          <input
            type="text"
            value={password}
            onChange={onPasswordChange}
          />
        </label>

        <button>login</button>
      </form>
    </div>
  );
};

export default LoginForm;
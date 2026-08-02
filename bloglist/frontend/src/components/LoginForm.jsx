const LoginForm = ({
  onSubmit,
  username,
  onUsernameChange,
  password,
  onPasswordChange
}) => {
  return (
    <div>
      <h2>Login to Blog App</h2>

      <form onSubmit={onSubmit}>
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
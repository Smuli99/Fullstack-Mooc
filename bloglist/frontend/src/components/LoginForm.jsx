import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    login({
      username,
      password
    });

    navigate('/');
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Login to Blog App</h2>

      <form onSubmit={handleLogin} className='loginForm'>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <label>
          password
          <input
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>

        <button>login</button>
      </form>
    </div>
  );
};

export default LoginForm;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  InputAdornment, TextField,
  IconButton, Button
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
        <TextField
          size='small'
          label='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <TextField
          size='small'
          label='password'
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }
          }}
        />
        <div>
          <Button variant='outlined' size='small' type='submit'>
            login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
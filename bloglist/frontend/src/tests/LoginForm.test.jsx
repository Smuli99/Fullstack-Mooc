import { screen, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import userEvent from '@testing-library/user-event';
import LoginForm from '../components/LoginForm';

describe('<LoginForm />', () => {
  const login = vi.fn();

  beforeEach(() => {
    render(
      <Router>
        <LoginForm login={login}/>
      </Router>
    );
  });

  test('renders content', () => {
    const h1 = screen.getByText('Login to Blog App');
    const usernameLabel = screen.getByText('username');
    const passwordLabel = screen.getByText('password');
    const loginButton = screen.getByRole('button');

    expect(h1).toBeDefined();
    expect(usernameLabel).toBeDefined();
    expect(passwordLabel).toBeDefined();
    expect(loginButton).toBeDefined();
  });

  test('calls login handler users credentials', async () => {
    const user = userEvent.setup();
    const usernameInput = screen.getByLabelText('username');
    const passwordInput = screen.getByLabelText('password');
    const loginButton = screen.getByRole('button', { type: 'submit' });

    await user.type(usernameInput, 'Foo Bar');
    await user.type(passwordInput, 'password123');
    await user.click(loginButton);

    expect(login.mock.calls).toHaveLength(1);
    expect(login.mock.calls[0][0]).toStrictEqual({
      username: 'Foo Bar',
      password: 'password123'
    });
  });
});
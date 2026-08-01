import { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import blogServices from './services/blogs';
import loginServices from './services/login';

const App = () => {
  const getLoggedUser = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

    return loggedUserJSON
      ? JSON.parse(loggedUserJSON)
      : null;
  };

  const [user, setUser] = useState(getLoggedUser);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const blogs = await blogServices.getAll();
      setBlogs(blogs);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      blogServices.setToken(user.token);
    }
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginServices.login({ username, password });
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      );

      blogServices.setToken(user.token);

      setUser(user);
      setUsername('');
      setPassword('');
    } catch {
      setNotification({
        type: 'error',
        text: 'Wrong credentials'
      });
      setTimeout(() => setNotification(null), 3000);
    };
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <div>
      <Notification notification={notification} />

      {!user &&
        <LoginForm
          onSubmit={handleLogin}
          username={username}
          onUsernameChange={({ target }) => setUsername(target.value)}
          password={password}
          onPasswordChange={({ target }) => setPassword(target.value)}
        />
      }

      {user &&
        <Blogs
          user={user}
          logout={handleLogout}
          blogs={blogs}
        />
      }
    </div>
  );
};

export default App;
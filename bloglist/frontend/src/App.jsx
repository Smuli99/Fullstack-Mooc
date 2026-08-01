import { useState, useEffect } from 'react';
import Blogs from './components/Blogs';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import blogServices from './services/blogs';
import loginServices from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginServices.login({ username, password });
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
          blogs={blogs}
        />
      }
    </div>
  );
};

export default App;
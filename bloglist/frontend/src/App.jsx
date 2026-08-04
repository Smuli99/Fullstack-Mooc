import { useState, useEffect } from 'react';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogApp from './components/BlogApp';

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

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const login = async (credentials) => {
    try {
      const user = await loginServices.login(credentials);
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      );

      blogServices.setToken(user.token);

      setUser(user);
    } catch {
      setNotification({
        type: 'error',
        text: 'wrong username or password'
      });
      setTimeout(() => setNotification(null), 3000);
    };
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const createBlog = async (blog) => {
    try {
      const savedBlog = await blogServices.create(blog);
      setBlogs(blogs.concat(savedBlog));

      setNotification({
        type: 'success',
        text: `\`${blog.title}\` by ${blog.author} added!`
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      setNotification({
        type: 'error',
        text: error.response.data.error
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const updateBlogsLikes = async (blog) => {
    try {
      const blogToUpdate = {
        ...blog,
        likes: blog.likes + 1
      };

      const updatedBlog = await blogServices.update(blogToUpdate);
      setBlogs(
        blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
      );
    } catch (error) {
      console.log(error);
      setNotification({
        type: 'error',
        text: 'some error happened'
      });
    }
  };

  return (
    <div>
      <Notification notification={notification} />

      {!user && <LoginForm login={login}/> }

      {user &&
        <BlogApp
          user={user}
          logout={handleLogout}
          blogs={sortedBlogs}
          createBlog={createBlog}
          updateBlogsLikes={updateBlogsLikes}
        />
      }
    </div>
  );
};

export default App;
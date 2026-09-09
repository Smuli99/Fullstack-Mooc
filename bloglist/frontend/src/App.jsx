import { useState, useEffect } from 'react';
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';

import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogApp from './components/BlogApp';
import Blog from './components/Blog';
import NewBlogForm from './components/NewBlogForm';

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
  const navigate = useNavigate();

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
    navigate('/');
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
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const removeBlog = async (blogToDelete) => {
    if (!window.confirm(
      `Remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
    )) return;

    navigate('/');

    try {
      await blogServices.remove(blogToDelete);

      setBlogs(
        blogs.filter(blog => blog.id !== blogToDelete.id)
      );

      setNotification({
        type: 'success',
        text: `Blog ${blogToDelete.title} by ${blogToDelete.author} deleted!`
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

  const match = useMatch('/blogs/:id');
  const blog = match
    ? blogs.find(b => b.id === match.params.id)
    : null;


  return (
    <Container>
      <div>
        <Link to='/'>blogs</Link>
        {user && <Link to='/create'>new blog</Link>}
        {!user && <Link to='/login'>login</Link>}
        {user && <button onClick={handleLogout}>logout</button>}
      </div>

      <Notification notification={notification} />

      <Routes>
        <Route path='/' element={
          <BlogApp
            blogs={sortedBlogs}
            user={user}
            removeBlog={removeBlog}
          />
        } />
        <Route path='/blogs/:id' element={
          <Blog
            blog={blog}
            user={user}
            removeBlog={removeBlog}
            updateBlogsLikes={updateBlogsLikes}
          />
        } />
        <Route path='/login' element={
          <LoginForm login={login} />
        } />
        <Route path='/create' element={
          <NewBlogForm createBlog={createBlog} />
        } />
      </Routes>
    </Container>
  );
};

export default App;
import { useState } from "react";
import NewBlogForm from "./NewBlogForm";
import Blog from "./Blog";

const Blogs = ({ user, logout, blogs, createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleNewBlog = async (event) => {
    event.preventDefault();

    createBlog({
      title,
      author,
      url
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <div>
      <h2>Blog App</h2>

      <b>{user.name} logged in</b>
      <button onClick={logout}>logout</button>

      <NewBlogForm
        onSubmit={handleNewBlog}
        title={title}
        onTitleChange={({ target }) => setTitle(target.value)}
        author={author}
        onAuthorChange={({ target }) => setAuthor(target.value)}
        url={url}
        onUrlChange={({ target }) => setUrl(target.value)}
      />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
};

export default Blogs;
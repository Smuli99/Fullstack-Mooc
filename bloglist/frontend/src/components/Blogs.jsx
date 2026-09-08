import { Link } from 'react-router-dom';

const Blogs = ({ blogs, user, removeBlog }) => {
  const handleRemove = (blogToRemove) => removeBlog(blogToRemove);

  const buttonStyle = {
    marginLeft: 5,
  };

  return (
    <div>
      <ul>
        {blogs.map(blog =>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
            {user && user.username === blog.user.username && (
              <button style={buttonStyle} onClick={() => handleRemove(blog)}>delete</button>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Blogs;
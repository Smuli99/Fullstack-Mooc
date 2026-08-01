import Blog from "./Blog";

const Blogs = ({ user, logout, blogs }) => {
  return (
    <div>
      <h2>Blog App</h2>

      <b>{user.name} logged in</b>
      <button onClick={logout}>logout</button>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
};

export default Blogs;
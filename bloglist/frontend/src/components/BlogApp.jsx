import Blogs from './Blogs';
import NewBlogForm from './NewBlogForm';
import Togglable from './Togglable';

const BlogApp = ({
  user,
  logout,
  blogs,
  createBlog,
  updateBlogsLikes,
}) => {
  return (
    <div>
      <h2>Blog App</h2>

      <b>{user.name} logged in</b>
      <button onClick={logout}>logout</button>

      <Togglable buttonLabel='new blog'>
        <NewBlogForm createBlog={createBlog}/>
      </Togglable>

      <Blogs
        blogs={blogs}
        updateBlogsLikes={updateBlogsLikes}
      />
    </div>
  );
};

export default BlogApp;
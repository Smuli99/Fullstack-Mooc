import Blogs from './Blogs';
import NewBlogForm from './NewBlogForm';
import Togglable from './Togglable';

const BlogApp = ({
  user,
  blogs,
  createBlog,
  updateBlogsLikes,
  removeBlog,
}) => {
  return (
    <div>
      <h2>Blog App</h2>

      <Togglable buttonLabel='new blog'>
        <NewBlogForm createBlog={createBlog}/>
      </Togglable>

      <Blogs
        blogs={blogs}
        updateBlogsLikes={updateBlogsLikes}
        removeBlog={removeBlog}
        user={user}
      />
    </div>
  );
};

export default BlogApp;
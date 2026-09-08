import Blogs from './Blogs';
import NewBlogForm from './NewBlogForm';
import Togglable from './Togglable';

const BlogApp = ({ blogs, createBlog }) => {
  return (
    <div>
      <h2>Blog App</h2>

      <Togglable buttonLabel='new blog'>
        <NewBlogForm createBlog={createBlog}/>
      </Togglable>

      <Blogs blogs={blogs} />
    </div>
  );
};

export default BlogApp;
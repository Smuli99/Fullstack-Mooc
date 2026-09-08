import Blogs from './Blogs';

const BlogApp = ({ blogs, user, removeBlog }) => {
  return (
    <div>
      <h2>Blog App</h2>
      <Blogs
        blogs={blogs}
        user={user}
        removeBlog={removeBlog}
      />
    </div>
  );
};

export default BlogApp;
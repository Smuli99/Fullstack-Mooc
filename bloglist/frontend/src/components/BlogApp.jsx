import Blogs from './Blogs';

const BlogApp = ({ blogs, user, removeBlog }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <Blogs
        blogs={blogs}
        user={user}
        removeBlog={removeBlog}
      />
    </div>
  );
};

export default BlogApp;
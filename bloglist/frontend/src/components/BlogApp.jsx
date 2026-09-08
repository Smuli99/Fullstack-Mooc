import Blogs from './Blogs';

const BlogApp = ({ blogs }) => {
  return (
    <div>
      <h2>Blog App</h2>
      <Blogs blogs={blogs} />
    </div>
  );
};

export default BlogApp;
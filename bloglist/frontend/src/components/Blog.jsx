const Blog = ({ blog }) => {
  return (
    <div>
      <p>{blog.title} {blog.author}</p>
    </div>
  );
};

export default Blog;
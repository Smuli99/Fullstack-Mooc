import Blog from "./Blog";

const Blogs = ({ blogs, updateBlogsLikes, removeBlog }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlogsLikes={updateBlogsLikes}
          removeBlog={removeBlog}
        />
      )}
    </div>
  );
};

export default Blogs;
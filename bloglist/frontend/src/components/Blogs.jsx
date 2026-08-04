import Blog from "./Blog";

const Blogs = ({ blogs, updateBlogsLikes }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateBlogsLikes={updateBlogsLikes}
        />
      )}
    </div>
  );
};

export default Blogs;
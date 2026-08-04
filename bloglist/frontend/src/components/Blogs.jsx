import Blog from './Blog';

const Blogs = ({
  blogs,
  user,
  removeBlog,
  updateBlogsLikes,
}) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateBlogsLikes={updateBlogsLikes}
          removeBlog={removeBlog}
        />
      )}
    </div>
  );
};

export default Blogs;
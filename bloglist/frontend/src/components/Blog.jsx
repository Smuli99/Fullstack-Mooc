const Blog = ({
  blog,
  user,
  removeBlog,
  updateBlogsLikes,
}) => {
  const handleLike = () => updateBlogsLikes(blog);
  const handleRemove = () => removeBlog(blog);

  return (
    <div>
      <div className='blog'>
        <h2>{blog.author}: {blog.title}</h2>

        <div className='blogContent'>
          <p>
            <a href={blog.url}>{blog.url}</a>
          </p>
          {!user && <p>likes: {blog.likes}</p>}
          {user && (
            <p>
              likes: {blog.likes}
              <button onClick={handleLike}>like</button>
            </p>
          )}
          <p>Added by {blog.user.name}</p>
          {user && blog.user.username === user.username && (
            <button className='remove' onClick={handleRemove}>
              delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
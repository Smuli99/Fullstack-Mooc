import { useState } from 'react';

const Blog = ({ blog, updateBlogsLikes, removeBlog }) => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => setShowInfo(!showInfo);
  const buttonText = showInfo
    ? 'hide'
    : 'view';

  const handleLike = () => updateBlogsLikes(blog);
  const handleRemove = () => removeBlog(blog);

  return (
    <div>
      <div className='blog'>
        <p>
          {blog.title} by {blog.author}
          <button onClick={toggleInfo}>{buttonText}</button>
        </p>

        {showInfo && (
          <>
            <p>{blog.url}</p>
            <p>
              likes: {blog.likes}
              <button onClick={handleLike}>like</button>
            </p>
            <p>{blog.user.name}</p>
            <button className='remove' onClick={handleRemove}>delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
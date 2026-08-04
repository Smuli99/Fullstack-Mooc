import { useState } from 'react';

const Blog = ({ blog, updateBlogsLikes }) => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => setShowInfo(!showInfo);
  const buttonText = showInfo
    ? 'hide'
    : 'view';

  const handleLike = () => updateBlogsLikes(blog);

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
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
import { useState } from 'react';

const Blog = ({ blog }) => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => setShowInfo(!showInfo);
  const buttonText = showInfo
    ? 'hide'
    : 'view';

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
              <button>like</button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
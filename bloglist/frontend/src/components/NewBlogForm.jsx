import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewBlogForm = ({ createBlog }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();

  const addNewBlog = (event) => {
    event.preventDefault();

    createBlog({
      title,
      author,
      url
    });

    navigate('/');

    setUrl('');
    setTitle('');
    setAuthor('');
  };

  return (
    <div>
      <h2>Create New Blog</h2>

      <form onSubmit={addNewBlog} className='blogForm'>
        <label>
          title
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
        <label>
          author
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
        <label>
          url
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>

        <button>create</button>
      </form>
    </div>
  );
};

export default NewBlogForm;
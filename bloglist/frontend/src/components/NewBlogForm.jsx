import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

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
        <TextField
          size='small'
          label='title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <TextField
          size='small'
          label='auhtor'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <TextField
          size='small'
          label='url'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <div>
          <Button size='small' type='submit' variant='outlined'>
            create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewBlogForm;
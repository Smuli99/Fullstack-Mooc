import {
  Card, CardContent, Button,
  Typography, Link
} from '@mui/material';

import LinkIcon from '@mui/icons-material/Link';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const Blog = ({
  blog,
  user,
  removeBlog,
  updateBlogsLikes,
}) => {
  const handleLike = () => updateBlogsLikes(blog);
  const handleRemove = () => removeBlog(blog);

  return (
    <Card className='blog'>
      <CardContent>
        <Typography variant='h6'>
          {blog.title}
        </Typography>

        <Typography variant='subtitle1'>
           by {blog.author}
        </Typography>

        <Typography style={{ marginTop: '10px' }}>
          <Link href={blog.url}>
            <LinkIcon className='icon' fontSize='small'/>
            {blog.url}
          </Link>
        </Typography>

        <Typography style={{ marginTop: '10px', marginLeft: '5px' }}>
          <FavoriteBorderOutlinedIcon className='icon' fontSize='small' />
          likes: {blog.likes}

          {user && (
            <Button size='small' variant='outlined' onClick={handleLike} style={{ marginLeft: 10 }}>
              like
            </Button>
          )}
        </Typography>

        <Typography variant='body1' style={{ marginTop: '10px', marginLeft: '5px' }}>
          Added by {blog.user.name}
        </Typography>

        {user && blog.user.username === user.username && (
          <Button
            style={{ marginTop: 10 }}
            size='small'
            color='error'
            variant='outlined'
            onClick={handleRemove}
          >
            delete
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Blog;
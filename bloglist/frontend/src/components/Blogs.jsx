import { Link } from 'react-router-dom';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const Blogs = ({ blogs, user }) => {

  return (
    <div>
      <ul>
        {blogs.map(blog =>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
            {user && user.username === blog.user.username && (
              <PersonOutlinedIcon className='icon' fontSize='small' />
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Blogs;
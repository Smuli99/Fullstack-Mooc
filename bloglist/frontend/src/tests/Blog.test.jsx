import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../components/Blog';

describe('<Blog />', () => {
  let blog;
  let user;
  let removeBlog;
  let updateBlogsLikes;

  beforeEach(() => {
    blog = {
      title: 'Testing Blog component',
      author: 'Developer',
      url: 'http://localhost:3001',
      likes: 67,
      user: {
        username: 'supertester',
        name: 'Samu Hytönen',
      },
    };

    user = {
      username: 'supertester',
      name: 'Samu Hytönen',
    };

    removeBlog = vi.fn();
    updateBlogsLikes = vi.fn();
  });

  describe('When not logged in', () => {
    beforeEach(() => {
      render(
        <Blog
          blog={blog}
          user={null}
          removeBlog={removeBlog}
          updateBlogsLikes={updateBlogsLikes}
        />
      );
    });

    test('renders content', () => {
      const element = screen.getByText('Developer: Testing Blog component');
      const likes = screen.queryByText('likes: 67');
      const url = screen.queryByText('http://localhost:3001');
      const creator = screen.getByText('Added by Samu Hytönen');

      expect(element).toBeInTheDocument();
      expect(likes).toBeInTheDocument();
      expect(url).toBeInTheDocument();
      expect(creator).toBeInTheDocument();
    });


    test('like button not shown', () => {
      expect(screen.queryByRole('button', { name: 'like' })).not.toBeInTheDocument();
    });

    test('delete button not shown', () => {
      expect(screen.queryByRole('button', { name: 'delete' })).not.toBeInTheDocument();
    });
  });

  describe('When logged in', () => {
    describe('Like button', () => {
      beforeEach(() => {
        render(
          <Blog
            blog={blog}
            user={user}
            removeBlog={removeBlog}
            updateBlogsLikes={updateBlogsLikes}
          />
        );

        user = userEvent.setup();
      });

      test('is shown', () => {
        expect(screen.getByRole('button', { name: 'like' })).toBeInTheDocument();
      });

      test('when clicked calls like handler with correct blog', async () => {
        const likeButton = screen.queryByRole('button', { name: 'like' });
        await user.click(likeButton);

        expect(updateBlogsLikes.mock.calls).toHaveLength(1);
        expect(updateBlogsLikes.mock.calls[0][0]).toBe(blog);
      });

      test('when clicked twice calls like handler twice', async () => {
        const likeButton = screen.queryByRole('button', { name: 'like' });
        await user.click(likeButton);
        await user.click(likeButton);

        expect(updateBlogsLikes.mock.calls).toHaveLength(2);
      });
    });

    describe('Delete button', () => {
      test('is shown if user is blogs creator', () => {
        render(
          <Blog
            blog={blog}
            user={user}
            removeBlog={removeBlog}
            updateBlogsLikes={updateBlogsLikes}
          />
        );

        expect(screen.queryByRole('button', { name: 'delete' })).toBeInTheDocument();
      });

      test('not shown if user is not blogs creator', () => {
        user = {
          username: 'another-user',
          name: 'John Doe'
        };

        render(
          <Blog
            blog={blog}
            user={user}
            removeBlog={removeBlog}
            updateBlogsLikes={updateBlogsLikes}
          />
        );

        expect(screen.queryByRole('button', { name: 'delete' })).not.toBeInTheDocument();
      });

      test('when clicked calls remove handler with correct blog', async () => {
        render(
          <Blog
            blog={blog}
            user={user}
            removeBlog={removeBlog}
            updateBlogsLikes={updateBlogsLikes}
          />
        );

        user = userEvent.setup();

        const deleteButton = screen.queryByRole('button', { name: 'delete' });
        await user.click(deleteButton);

        expect(removeBlog.mock.calls).toHaveLength(1);
        expect(removeBlog.mock.calls[0][0]).toBe(blog);
      });
    });
  });
});
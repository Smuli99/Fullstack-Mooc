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

    render(
      <Blog
        blog={blog}
        user={user}
        removeBlog={removeBlog}
        updateBlogsLikes={updateBlogsLikes}
      />
    );
  });

  test('Renders blogs title and author but not url or likes by default', () => {
    const element = screen.getByText(
      'Testing Blog component by Developer'
    );

    expect(element).toBeInTheDocument();

    const url = screen.queryByText('http://localhost:3001');
    const likes = screen.queryByText('likes: 67');

    expect(url).not.toBeInTheDocument();
    expect(likes).not.toBeInTheDocument();
  });

  test('Renders view button', () => {
    const element = screen.getByRole('button');
    expect(element).toBeInTheDocument();
  });

  test('Clicking view button shows more information about blog', async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText('view');
    await user.click(viewButton);

    const title = screen.getByText(
      'Testing Blog component by Developer'
    );
    const url = screen.getByText('http://localhost:3001');
    const likes = screen.getByText('likes: 67');
    const likeButton = screen.getByText('like');
    const userField = screen.getByText('Samu Hytönen');
    const deleteButton = screen.getByText('delete');
    const hideButton = screen.getByText('hide');

    expect(title).toBeInTheDocument();
    expect(url).toBeInTheDocument();
    expect(likes).toBeInTheDocument();
    expect(likeButton).toBeInTheDocument();
    expect(userField).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(hideButton).toBeInTheDocument();
  });

  describe('view button already pressed', () => {
    const user = userEvent.setup();

    beforeEach(async () => {
      const button = screen.getByRole('button');
      await user.click(button);
    });

    test('calling like handler with correct blog when clicking like button', async () => {
      const likeButton = screen.getByText('like');
      await user.click(likeButton);

      expect(updateBlogsLikes.mock.calls).toHaveLength(1);
      expect(updateBlogsLikes.mock.calls[0][0]).toBe(blog);
    });

    test('clicking like twice calls like handler twice', async () => {
      const likeButton = screen.getByText('like');
      await user.click(likeButton);
      await user.click(likeButton);

      expect(updateBlogsLikes.mock.calls).toHaveLength(2);
    });

    test('calling remove handler with rigth blog when clicking delete button', async () => {
      const deleteButton = screen.getByText('delete');

      await user.click(deleteButton);

      expect(removeBlog.mock.calls).toHaveLength(1);
      expect(removeBlog.mock.calls[0][0]).toBe(blog);
    });

    test('clicking hide button shows less information about blog', async () => {
      const hideButton = screen.getByText('hide');

      await user.click(hideButton);

      const title = screen.getByText(
        'Testing Blog component by Developer'
      );
      const url = screen.queryByText('http://localhost:3001');
      const likes = screen.queryByText('likes: 67');
      const likeButton = screen.queryByText('like');
      const userField = screen.queryByText('Samu Hytönen');
      const deleteButton = screen.queryByText('delete');
      const viewButton = screen.getByText('view');

      expect(title).toBeInTheDocument();
      expect(url).not.toBeInTheDocument();
      expect(likes).not.toBeInTheDocument();
      expect(likeButton).not.toBeInTheDocument();
      expect(userField).not.toBeInTheDocument();
      expect(deleteButton).not.toBeInTheDocument();
      expect(viewButton).toBeInTheDocument();
    });
  });
});
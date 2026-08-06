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

    expect(element).toBeDefined();

    const url = screen.queryByText('http://localhost:3001');
    const likes = screen.queryByText('likes: 67');

    expect(url).not.toBeInTheDocument();
    expect(likes).not.toBeInTheDocument();
  });

  test('Renders view button', () => {
    const element = screen.getByRole('button');
    expect(element).toBeDefined();
  });

  /*test('Clicking view button shows more info about blog', async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText('view');

    await user.click(viewButton);

    screen.debug();

    const title = screen.getByText(
      'Testing Blog component by Developer'
    );
    const url = screen.getByText('http://localhost:3001');
    const likes = screen.getByText('likes: 67');
    const likeButton = screen.getByText('like');
    const userField = screen.getByText('Samu Hytönen');
    const deleteButton = screen.getByText('delete');
    const hideButton = screen.getByText('hide');

    expect(title).toBeDefined();
    expect(url).toBeDefined();
    expect(likes).toBeDefined();
    expect(likeButton).toBeDefined();
    expect(userField).toBeDefined();
    expect(deleteButton).toBeDefined();
    expect(hideButton).toBeDefined();
  });

  test('calling like handler with correct blog when clicking like button', async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByRole('button');

    await user.click(viewButton);

    const likeButton = screen.getByText('like');

    await user.click(likeButton);
    console.log(updateBlogsLikes.mock.calls);
    expect(updateBlogsLikes.mock.calls).toHaveLength(1);

  });*/

  /*test('Clicking hide button shows less informarion', async () => {
    //
  });*/
});
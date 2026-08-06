import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewBlogForm from '../components/NewBlogForm';

describe('<NewBlogForm />', () => {
  let mockHandler;

  beforeEach(() => {
    mockHandler = vi.fn();
    render(<NewBlogForm createBlog={mockHandler}/>);
  });

  test('renders forms content', () => {
    const h2 = screen.getByText('Create New Blog');
    const titleInput = screen.getByLabelText('title');
    const authorInput = screen.getByLabelText('author');
    const urlInput = screen.getByLabelText('url');
    const button = screen.getByRole('button', { type: 'submit' });

    expect(h2).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(authorInput).toBeInTheDocument();
    expect(urlInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('create blog handler called with correct props when create button clicked', async () => {
    const user = userEvent.setup();
    const titleInput = screen.getByLabelText('title');
    const authorInput = screen.getByLabelText('author');
    const urlInput = screen.getByLabelText('url');
    const button = screen.getByRole('button');

    await user.type(titleInput, 'Input text...');
    await user.type(authorInput, 'Author text...');
    await user.type(urlInput, 'Url text...');
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler.mock.calls[0][0]).toStrictEqual({
      title: 'Input text...',
      author: 'Author text...',
      url: 'Url text...',
    });
  });
});
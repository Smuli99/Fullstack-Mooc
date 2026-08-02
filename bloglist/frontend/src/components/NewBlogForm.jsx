const NewBlogForm = ({
  onSubmit,
  title,
  author,
  url,
  onTitleChange,
  onAuthorChange,
  onUrlChange
}) => {
  return (
    <div>
      <h2>Create New Blog</h2>

      <form onSubmit={onSubmit}>
        <label>
          title
          <input
            type="text"
            value={title}
            onChange={onTitleChange}
          />
        </label>
        <label>
          author
          <input
            type="text"
            value={author}
            onChange={onAuthorChange}
          />
        </label>
        <label>
          url
          <input
            type="text"
            value={url}
            onChange={onUrlChange}
          />
        </label>

        <button>create</button>
      </form>
    </div>
  );
};

export default NewBlogForm;
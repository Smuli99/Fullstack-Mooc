const dummy = (blogs) => {
  console.log(blogs);
  return 1;
};

const totalLikes = (blogs) =>
  blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (!blogs) return undefined;
  return blogs.reduce((max, blog) =>
    blog.likes > max.likes ? blog : max, blogs[0]);
};

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length < 1) return undefined;

  const authors = [ ...new Set(blogs.map(b => b.author)) ]
    .map(author => ({
      author,
      blogs: blogs.filter(blog => blog.author === author).length,
    }));

  return authors
    .reduce((max, current) =>
      current.blogs > max.blogs ? current : max
    );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
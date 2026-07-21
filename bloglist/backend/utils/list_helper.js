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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
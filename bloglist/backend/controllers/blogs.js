const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404).end();
  }
});

blogRouter.post('/', async (req, res) => {
  const body = req.body;

  if (!body.title || !body.url) {
    return res.status(400).end();
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  const savedBlog = await blog.save();
  res.status(201).json(savedBlog);
});

blogRouter.put('/:id', async (req, res) => {
  const { title, author, url, likes } = req.body;

  if (!title.trim() || !url.trim()) {
    return res.status(400).end();
  }

  const blogToUpdate = await Blog.findById(req.params.id);

  if (!blogToUpdate) {
    return res.status(404).end();
  }

  blogToUpdate.title = title;
  blogToUpdate.author = author;
  blogToUpdate.url = url;
  blogToUpdate.likes = likes;

  await blogToUpdate.save();
  res.json(blogToUpdate);
});

blogRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = blogRouter;
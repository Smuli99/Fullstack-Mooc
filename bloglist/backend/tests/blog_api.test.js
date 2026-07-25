const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);

describe('When theres initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('returned blogs use id instead of _id', async () => {
    const response = await api.get('/api/blogs');
    response.body.forEach(blog => {
      assert(blog.id);
      assert(!blog._id);
    });
  });

  // describe('viewing a specific blog', () => {});
  describe('adding a new blog', () => {
    test('succeeds with valid data', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const newBlog = {
        title: "Foo Foo",
        author: "Bar Foo",
        url: "http://example.com",
        likes: 67,
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1);

      const titles = blogsAtEnd.map(b => b.title);
      assert(titles.includes('Foo Foo'));
    });

    test('defaults likes to 0 if likes is missing', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const newBlog = {
        title: "No Likes",
        author: "Bar Foo",
        url: "https://localhost.com",
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1);

      const addedBlog = blogsAtEnd[blogsAtEnd.length - 1];
      assert(addedBlog.title.includes('No Likes'));
      assert.strictEqual(addedBlog.likes, 0);
    });

    test('fails with status code 400 if title is missing', async () => {
      const noTitle = {
        author: "No Title",
        url: "https://example.com",
        likes: 10,
      };

      await api
        .post('/api/blogs')
        .send(noTitle)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });

    test('fails with status code 400 if url is missing', async () => {
      const noUrl = {
        title: "No Url",
        author: "John Doe",
        likes: 9,
      };

      await api
        .post('/api/blogs')
        .send(noUrl)
        .expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });
  });

  describe('deletion of a blog', () => {
    test.only('succeeds with statuscode 204 if valid id', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDeleteId = blogsAtStart[0].id;

      await api
        .delete(`/api/blogs/${blogToDeleteId}`)
        .expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);

      const ids = blogsAtEnd.map(blog => blog.id);
      assert(!ids.includes(blogToDeleteId));
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
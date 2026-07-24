const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const mongoose = require('mongoose');
const Blog = require('../models/blog');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe('HTML Protocol test', () => {
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

  test('a valid blog can be added', async () => {
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

  test.only('valid blog added without likes equals to zero likes', async () => {
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
    assert.strictEqual(blogsAtEnd.length, blogsAtStart + 1);

    const addedBlog = blogsAtEnd[blogsAtEnd.length - 1];
    assert(addedBlog.title.includes('No Likes'));
    assert.strictEqual(addedBlog.likes, 0);
  });
});

after(async () => {
  await mongoose.connection.close();
});
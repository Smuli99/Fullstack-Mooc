const { test, describe, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);

describe('When theres initially some blogs saved', () => {
  beforeEach(async () => {
    await helper.initializeDatabase();
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

  describe('viewing a specific blog', () => {
    test('succeeds with valid id', async () => {
      const blogToView = helper.initialBlogs[0]._id;

      await api
        .get(`/api/blogs/${blogToView}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('fails with status code 404 if blog does not exits', async () => {
      const validId = await helper.nonExistingId();

      await api
        .get(`/api/blogs/${validId}`)
        .expect(404);
    });

    test('fails with status code 400 if id is invalid', async () => {
      const invalidId = "43i3jqrkjj134";

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400);
    });
  });

  describe('adding a new blog', () => {
    test('succeeds with valid data', async () => {
      const users = await helper.usersInDb();
      const blogsAtStart = await helper.blogsInDb();
      const newBlog = {
        title: "Foo Foo",
        author: "Bar Foo",
        url: "http://example.com",
        likes: 67,
        user: users[0].id,
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
      const users = await helper.usersInDb();
      const blogsAtStart = await helper.blogsInDb();
      const newBlog = {
        title: "No Likes",
        author: "Bar Foo",
        url: "https://localhost.com",
        user: users[0].id,
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

    test('fails with proper status code and message if title is missing', async () => {
      const users = await helper.usersInDb();
      const noTitle = {
        author: "No Title",
        url: "https://example.com",
        likes: 10,
        user: users[0].id,
      };

      const res = await api
        .post('/api/blogs')
        .send(noTitle)
        .expect(400);

      assert(res.body.error.includes('`title` is required'));

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });

    test('fails with proper status code and message if url is missing', async () => {
      const users = await helper.usersInDb();
      const noUrl = {
        title: "No Url",
        author: "John Doe",
        likes: 9,
        user: users[0].id,
      };

      const res = await api
        .post('/api/blogs')
        .send(noUrl)
        .expect(400);

      assert(res.body.error.includes('`url` is required'));

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });

    test('fails with proper status code and message if user is missing', async () => {
      const noUser = {
        title: "Foo Foo",
        author: "Bar Foo",
        url: "http://example.com",
        likes: 67,
      };

      const res = await api
        .post('/api/blogs')
        .send(noUser)
        .expect(400);

      assert(res.body.error.includes('userID missing or invalid'));

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });

    test('fails with proper status code and message if user is invalid', async () => {
      const invalidUserId = "73418sajdhjksahd";

      const noUser = {
        title: "Foo Foo",
        author: "Bar Foo",
        url: "http://example.com",
        likes: 67,
        user: invalidUserId,
      };

      const res = await api
        .post('/api/blogs')
        .send(noUser)
        .expect(400);

      assert(res.body.error.includes('malformatted id'));

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
    });
  });

  describe('updating a specific blog', () => {
    test('succeeds with valid id and data', async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];
      blogToUpdate.title = 'succesful update';

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);

      const titles = blogsAtEnd.map(blog => blog.title);
      assert(titles.includes('succesful update'));
    });

    test('fails with proper status code and message if invalid data', async () => {
      const blogs = await helper.blogsInDb();
      const blogToUpdate = blogs[0];
      blogToUpdate.title = '';

      const res = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(400);

      assert(res.body.error.includes('`title` is required'));
    });

    test('fails with proper status code and message if blog does not exits', async () => {
      const blog = await helper.nonExistingBlog();
      blog.title = 'non existing';

      const res = await api
        .put(`/api/blogs/${blog.id}`)
        .send(blog)
        .expect(404);

      assert(res.body.error.includes(`blog with id \`${blog.id}\` not found`));
    });
  });

  describe('deletion of a blog', () => {
    test('succeeds with statuscode 204 if valid id', async () => {
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
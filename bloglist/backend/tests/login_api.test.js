const { test, beforeEach, after, describe } = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);

describe('login', () => {
  beforeEach(async () => {
    await helper.initializeDatabase();
  });

  test('succeeds with correct credentials', async () => {
    const user = helper.initialUsers[0];
    const credentials = {
      username: user.username,
      password: user.password
    };

    const res = await api
      .post('/api/login')
      .send(credentials)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert.strictEqual(res.body.username, user.username);
    assert.strictEqual(res.body.name, user.name);
  });

  test('succesful login returns token', async () => {
    const user = helper.initialUsers[0];
    const credentials = {
      username: user.username,
      password: user.password
    };

    const res = await api
      .post('/api/login')
      .send(credentials)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    assert(res.body.token);
  });

  test('fails with proper status code and message if incorrect credentials', async () => {
    const credentials = {
      username: 'wrong',
      password: 'oops'
    };

    const res = await api
      .post('/api/login')
      .send(credentials)
      .expect(401);

    assert(res.body.error.includes('invalid username or password'));
    assert(!res.body.token);
  });
});

after(async () => {
  await mongoose.connection.close();
});
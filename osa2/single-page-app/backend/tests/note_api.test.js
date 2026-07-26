const { test, after, beforeEach, describe } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);

describe('when there is initially some notes saved', () => {
  beforeEach(async () => {
    await helper.inititalizeDatabase();
  });

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all notes are returned', async() => {
    const response = await api.get('/api/notes');
    assert.strictEqual(response.body.length, helper.initialNotes.length);
  });

  test('a specific note is within the returned notes', async() => {
    const response = await api.get('/api/notes');
    const contents = response.body.map(e => e.content);
    assert(contents.includes('HTML is easy'));
  });

  describe('viewing a specific note', () => {
    test('succeeds with a valid id', async () => {
      const notesAtStart = await helper.notesInDb();
      const noteToView = notesAtStart[0];

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      assert.deepStrictEqual(resultNote.body, noteToView);
    });

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingNoteId();

      await api
        .get(`/api/notes/${validNonexistingId}`)
        .expect(404);
    });

    test('fails with statuscode 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445';

      await api
        .get(`/api/notes/${invalidId}`)
        .expect(400);
    });
  });

  describe('addition of a new note', () => {
    let token;

    beforeEach(async () => {
      token = await helper.loginUser(api);
    });

    test('succeeds with user logged in and valid data', async () => {
      const users = await helper.usersInDb();

      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
        userId: users[0].id,
      };

      await api
        .post('/api/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/);


      const notesAtEnd = await helper.notesInDb();
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1);

      const contents = notesAtEnd.map(n => n.content);
      assert(contents.includes('async/await simplifies making async calls'));
    });

    test('fails with proper status code and message if invalid token', async () => {
      token = 'invalid';
      const users = await helper.usersInDb();

      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
        userId: users[0].id,
      };

      const response = await api
        .post('/api/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(newNote)
        .expect(401);

      assert(response.body.error.includes('token missing or invalid'));
    });

    test('fails with statuscode 400 if data is invalid', async () => {
      const users = await helper.usersInDb();

      const newNote = {
        important: true,
        user: users[0].id,
      };

      await api
        .post('/api/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(newNote)
        .expect(400);

      const notesAtEnd = await helper.notesInDb();
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length);
    });

    test('fails with proper status code and message if user does not exists', async () => {
      const user = await helper.findUser('root');
      await user.deleteOne();

      const newNote = {
        content: 'Some content',
        important: false,
        userId: user.id,
      };

      const response = await api
        .post('/api/notes')
        .set('Authorization', `Bearer ${token}`)
        .send(newNote)
        .expect(400);

      assert(response.body.error.includes('userId missing or not valid'));
    });
  });

  describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const notesAtStart = await helper.notesInDb();
      const noteToDelete = notesAtStart[0];

      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204);

      const notesAtEnd = await helper.notesInDb();
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1);

      const ids = notesAtEnd.map(n => n.id);
      assert(!ids.includes(noteToDelete.id));
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
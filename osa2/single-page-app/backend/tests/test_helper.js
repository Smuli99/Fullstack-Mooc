const bcrypt = require('bcrypt');
const Note = require('../models/note');
const User = require('../models/user');

const initialUsers = [
  {
    username: 'root',
    name: 'superuser',
    password: 'sekret',
  },
  {
    username: 'testuser',
    name: 'John Doe',
    password: 'salainen',
  },
];

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScipt',
    important: true,
  },
];

const createUsers = async () => {
  return Promise.all(
    initialUsers.map(async user => ({
      username: user.username,
      name: user.name,
      passwordHash: await bcrypt.hash(user.password, 10),
    }))
  );
};

/**
 * Initializes database that one user has created two notes
 */
const inititalizeDatabase = async () => {
  await User.deleteMany({});
  await Note.deleteMany({});

  const users = await createUsers();
  const savedUsers = await User.insertMany(users);
  const user = savedUsers[0];

  const notes = initialNotes
    .map(note => ({
      ...note,
      user: user.id,
    }));

  const savedNotes = await Note.insertMany(notes);

  user.notes = savedNotes.map(note => note.id);
  await user.save();
};

const nonExistingNoteId = async () => {
  const note = new Note({ content: 'willremovethissoon' });
  await note.save();
  await note.deleteOne();

  return note._id.toString();
};

const nonExistingUserId = async () => {
  const user = new User({ username: 'willremovethissoon' });
  await user.save();
  await user.deleteOne();

  return user._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map(note => note.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

module.exports = {
  initialNotes,
  inititalizeDatabase,
  nonExistingNoteId,
  nonExistingUserId,
  notesInDb,
  usersInDb,
};
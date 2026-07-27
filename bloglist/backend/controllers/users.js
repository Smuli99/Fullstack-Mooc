const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body;

  if (!password) {
    return res.status(400).send({ error: '`password` is required' });
  }

  if (password.trim().length < 8) {
    return res.status(400).send({
      error: `\`password\` (\`${password}\`, length ${password.length}) is shorter than the minimum allowed length (8)`
    });
  }

  const user = new User({
    username,
    name,
    password: await bcrypt.hash(password, 10),
  });

  await user.save();
  res.status(201).json(user);
});

module.exports = usersRouter;
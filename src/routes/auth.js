const bcrypt = require('bcrypt');
const router = require('express').Router();
const users = require('../models/users');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await users.list(username);

    if (user && bcrypt.compareSync(password, user.password)) {
      return res.json({
        message: `Welcome ${username}.`,
        success: true
      });
    }

    return res.status(401).json({
      message: "Invalid creds, sun.",
      success: false
    });
  } catch (error) {
    return res.status(500).json({
      message: "#nope",
      success: false
    })
  }
});

router.post('/register', async (req, res) => {
  let user = req.body;
  const { username, password } = user;
  const length = Object.keys(user).length;

  if (!length) {
    return res.status(400).json({
      message: "Missing user data.",
      success: false
    });
  }

  if (length > 0 && !username || !password) {
    return res.status(400).json({
      message: "Missing required username or password field.",
      success: false
    });
  }

  try {
    user.password = bcrypt.hashSync(password, 10);
    user = await users.new(user);

    if (user) {
      return res.status(201).json({
        message: "User created successfully.",
        success: true,
        user
      });
    }
  } catch (error) {
    return res.status(500).json({
      error,
      message: "User could not be saved.",
      success: false
    });
  }
});

module.exports = router;
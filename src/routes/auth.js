const bcrypt = require('bcrypt');
const router = require('express').Router();
const users = require('../models/users');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Missing credentials.",
      success: false
    });
  }

  try {
    const user = await users.list(username);
    
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = username;

      return res.json({
        message: `Welcome ${username}... get you a cookie.`,
        session: req.session,
        success: true
      });
    } else {
      return res.status(401).json({
        message: "Invalid credentials, son.",
        success: false
      });
    }
  } catch (error) {
    return res.status(500).json({
      error,
      message: "#nope",
      success: false
    });
  }
});

router.delete('/logout', (req, res) => {
  if (req.session) {
    return req.session.destroy(error => {
      if (error) {
        return res.status(500).json({
          message: "Oh noes! Session could not be destroyed.",
          success: false
        });
      }

      return res.json({
        message: "YEET! Gottem.",
        success: true
      });
    });
  } else {
    res.end();
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
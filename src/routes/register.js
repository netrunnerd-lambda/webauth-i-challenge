const bcrypt = require('bcrypt');
const router = require('express').Router();
const users = require('../models/users');

router.post('/', async (req, res) => {
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
const bcrypt = require('bcrypt');
const router = require('express').Router();
const users = require('../models/users');

router.post('/', async (req, res) => {
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

module.exports = router;
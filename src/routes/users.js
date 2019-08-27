const router = require('express').Router();
const users = require('../models/users');
const { validate } = require('../middleware');

router.get('/', validate, async (req, res) => {
  const { username } = req.headers;

  try {
    const list = await users.list();

    if (!list.length) {
      return res.status(404).json({
        message: "No users.",
        success: false
      });
    }

    return res.json({
      user: username,
      users: list,
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: "Users could not be retrieved.",
      success: false
    });
  }
});

module.exports = router;
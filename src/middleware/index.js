const bcrypt = require('bcrypt');
const users = require('../models/users');

exports.validate = async (req, res, next) => {
  const { username, password } = req.headers;

  if (!username || !password) {
    return res.status(400).json({
      message: "No credentials provided.",
      success: false
    });
  }

  try {
    const user = await users.list(username);

    if (user && bcrypt.compareSync(password, user.password)) {
      return next();
    }

    return res.status(401).json({
      message: "Invalid creds.",
      success: false
    });
  } catch (error) {
    return res.status(500).json({
      message: "User could not be validated.",
      success: false
    });
  }
};
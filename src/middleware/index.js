exports.validate = async (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    return res.status(401).json({
      message: "No credentials provided.",
      success: false
    });
  }
};
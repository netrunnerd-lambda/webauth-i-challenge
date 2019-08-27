const router = require('express').Router();

router.get('/', (req, res) => res.json({
  message: "Unauthorized use of this service may result in concrete or lead poisoning.",
  success: true
}));

router.use('/login', require('./login'));
router.use('/register', require('./register'));
router.use('/users', require('./users'));

module.exports = router;
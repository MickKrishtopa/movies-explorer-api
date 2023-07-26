const router = require('express').Router();
const userRoutes = require('./users');
const moviesRoutes = require('./movies');

// const { login, createUser } = require('../controllers/users');

// router.post('/signup', createUser);
// router.post('/signip', login);

router.use((req, res, next) => {
  req.user = { _id: '69' };
  next();
});
router.use('/users', userRoutes);
router.use('/movies', moviesRoutes);

module.exports = router;

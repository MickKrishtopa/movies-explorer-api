const router = require('express').Router();
const userRoutes = require('./users');
const moviesRoutes = require('./movies');
const { createUser, login, logOut } = require('../controllers/user');
const auth = require('../middlewares/auth');

// const { login, createUser } = require('../controllers/users');

// router.post('/signup', createUser);
// router.post('/signip', login);

router.post('/signup', createUser);
router.post('/signin', login);
router.post('/signout', logOut);
router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', moviesRoutes);

module.exports = router;

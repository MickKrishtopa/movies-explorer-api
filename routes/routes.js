const router = require('express').Router();
const userRoutes = require('./users');
const moviesRoutes = require('./movies');

// const { login, createUser } = require('../controllers/users');

// router.post('/signup', createUser);
// router.post('/signip', login);

router.use('/users', userRoutes);
router.use('/movies', moviesRoutes);

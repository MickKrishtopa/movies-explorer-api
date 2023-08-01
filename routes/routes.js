const router = require('express').Router();
const userRoutes = require('./users');
const moviesRoutes = require('./movies');
const { createUser, login, logOut } = require('../controllers/user');
const auth = require('../middlewares/auth');
const createUserValidation = require('../middlewares/validation/createUserValidation');
const loginValidation = require('../middlewares/validation/loginValidation');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginValidation, login);
router.use(auth);
router.post('/signout', logOut);
router.use('/users', userRoutes);
router.use('/movies', moviesRoutes);
router.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;

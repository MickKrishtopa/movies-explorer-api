const router = require('express').Router();

const createUserValidation = require('../middlewares/validation/createSavedMovieValidation');
const movieByIdValidation = require('../middlewares/validation/movieByIdValidation');

const {
  getSavedMovies,
  createSavedMovie,
  removeSavedMovieById,
} = require('../controllers/movies');

router.get('/', getSavedMovies);
router.post('/', createUserValidation, createSavedMovie);
router.delete('/:movieId', movieByIdValidation, removeSavedMovieById);

module.exports = router;

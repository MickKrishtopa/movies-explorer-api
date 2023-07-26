const router = require('express').Router();

const {
  getSavedMovies,
  createSavedMovie,
  removeSavedMovieById,
} = require('../controllers/movies');

router.get('/', getSavedMovies);
router.post('/', createSavedMovie);
router.delete('/:movieId', removeSavedMovieById);

module.exports = router;

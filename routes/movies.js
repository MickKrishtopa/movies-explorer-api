const router = require('express').Router();

const {
  getMovies,
  createMovie,
  removeMovieById,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovie);
router.delete('/:movieId', removeMovieById);

module.exports = router;

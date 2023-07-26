const Movie = require('../models/movie');

const getSavedMovies = (req, res, next) => Movie.find({})
  .then((movies) => res.send(movies))
  .catch(next);

const createSavedMovie = (req, res, next) => {
  const newSavedMovieData = req.body;
  const newSavedMovieOwner = req.user._id;

  return Movie.create({ ...newSavedMovieData, owner: newSavedMovieOwner })
    .then((newSavedMovie) => res.send(newSavedMovie))
    .catch(next);
};

const removeSavedMovieById = (req, res, next) => Movie.findById(req.params.movieId)
  .then((movie) => {
    if (movie && movie.owner.valueOf() !== req.user._id) {
      return next(new Error('Недостаточно прав для удаления'));
    }

    return Movie.findByIdAndDelete(req.params.movieId)
      .then((removedMovie) => res.send(removedMovie));
  })
  .catch(next);

module.exports = {
  getSavedMovies,
  createSavedMovie,
  removeSavedMovieById,
};

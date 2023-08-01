const mongoose = require('mongoose');

const Movie = require('../models/movie');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const getSavedMovies = (req, res, next) => Movie.find({ owner: req.user._id })
  .then((movies) => res.send(movies))
  .catch(next);

const createSavedMovie = (req, res, next) => {
  const newSavedMovieData = req.body;
  const newSavedMovieOwner = req.user._id;

  return Movie.create({ ...newSavedMovieData, owner: newSavedMovieOwner })
    .then((newSavedMovie) => res.send(newSavedMovie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError(Object.values(err.errors)
          .map((error) => error.message)
          .join(', ')));
      }

      return next(err);
    });
};

const removeSavedMovieById = (req, res, next) => Movie.findById(req.params.movieId)
  .orFail(new NotFoundError('Фильм с таким id не найден'))
  .then((movie) => {
    if (movie && movie.owner.valueOf() !== req.user._id) {
      return next(new ForbiddenError('Недостаточно прав для удаления'));
    }

    return Movie.findByIdAndDelete(req.params.movieId)
      .then((removedMovie) => res.send(removedMovie));
  })
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      return next(new BadRequestError('Некорректный ID фильма'));
    }
    return next(err);
  });

module.exports = {
  getSavedMovies,
  createSavedMovie,
  removeSavedMovieById,
};

const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  director: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (string) => validator.isURL(string),
      message: 'Ссылка на изображение некорректная',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (string) => validator.isURL(string),
      message: 'Ссылка на трейлер некорректная',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (string) => validator.isURL(string),
      message: 'Ссылка на изображение некорректная',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('movie', movieSchema);

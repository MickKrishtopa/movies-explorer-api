const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateToken } = require('../utils/jwt');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ConflictError = require('../errors/ConflictError');

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

const changeUserInfo = (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  return User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
    runValidators: true,
  })
    .orFail(new NotFoundError())
    .then((updatedUserInfo) => res.send(updatedUserInfo))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError(Object.values(err.errors)
          .map((error) => error.message)
          .join(', ')));
      }

      if (err.name === 'MongoServerError') {
        return next(new ConflictError('Email уже используется'));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new ValidationError(Object.values(err.errors)
          .map((error) => error.message)
          .join(', ')));
      }

      if (err.name === 'MongoServerError') {
        return next(new ConflictError('Email уже используется'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = generateToken(user._id);
      res.cookie('jwt', token, {
        maxAge: 604800000,
        httpOnly: true,
      });
      return res.send({ message: 'Авторизация прошла успешно' });
    })
    .catch(next);
};

const logOut = (req, res) => {
  res.clearCookie('jwt');
  res.send('Вы вышли из своего аккаунта');
};

module.exports = {
  changeUserInfo,
  getUserInfo,
  createUser,
  login,
  logOut,
};

const User = require('../models/user');

const getUserInfo = (req, res, next) => {
  console.log('Отработал контроллер  гет юер инфо');
  console.log(req.user);
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
    .then((updatedUserInfo) => res.send(updatedUserInfo))
    .catch(next);
};

module.exports = {
  changeUserInfo,
  getUserInfo,
};

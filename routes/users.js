const router = require('express').Router();

const changeUserInfoValidation = require('../middlewares/validation/changeUserInfoValidation');

const {
  getUserInfo,
  changeUserInfo,
} = require('../controllers/user');

router.get('/me', getUserInfo);
router.patch('/me', changeUserInfoValidation, changeUserInfo);

module.exports = router;

const router = require('express').Router();

const {
  getUserInfo,
  changeUserInfo,
} = require('../controllers/user');

router.get('/me', getUserInfo);
router.patch('/me', changeUserInfo);

module.exports = router;

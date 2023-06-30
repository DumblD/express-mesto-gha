const router = require('express').Router();
const {
  validateUsersMeInfo,
  validateUsersMeAvatar,
  validateUsersSearchById,
} = require('../appconfig/appConfig');
const {
  getUsers,
  getUserInfo,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getUserInfo);

router.patch('/users/me', validateUsersMeInfo, updateUserInfo);

router.patch('/users/me/avatar', validateUsersMeAvatar, updateUserAvatar);

router.get('/users/:userId', validateUsersSearchById, getUserById);

module.exports = router;

const router = require('express').Router();
const {
  validateAuthentication,
  validateRegistration,
} = require('../appconfig/appConfig');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const invalidRoutes = require('./notFindPages');
const {
  login,
  createUser,
} = require('../controllers/users');
const auth = require('../middlwares/auth');

router.post('/signin', validateAuthentication, login);

router.post('/signup', validateRegistration, createUser);

router.use(auth);

router.use(usersRouter, cardsRouter, invalidRoutes);

module.exports = router;

const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const invalidRoutes = require('./notFindPages');
const {
  login,
  createUser,
} = require('../controllers/users');
const auth = require('../middlwares/auth');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string(),
    password: Joi.string(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string(),
    password: Joi.string(),
  }),
}), createUser);

router.use(auth);

router.use(usersRouter, cardsRouter, invalidRoutes);

module.exports = router;

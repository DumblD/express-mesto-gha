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
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().pattern(/^https?:\/\/[A-Za-z0-9-._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]+$/),
  }),
}), createUser);

router.use(auth);

router.use(usersRouter, cardsRouter, invalidRoutes);

module.exports = router;

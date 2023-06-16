const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const invalidRoutes = require('./notFindPages');

router.use(usersRouter, cardsRouter, invalidRoutes);

module.exports = router;

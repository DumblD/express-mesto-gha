const router = require('express').Router();
const { notFindPage } = require('../controllers/notFindPage');

router.all('*', notFindPage);

module.exports = router;

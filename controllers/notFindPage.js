const { notFoundErrorStatusCode } = require('../utils/errorsStatusCodes');

const notFindPage = async (req, res) => {
  res.status(notFoundErrorStatusCode).send({ message: 'Страница не найдена' });
};

module.exports = { notFindPage };

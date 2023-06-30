const NotFoundError = require('../utils/customErrorsClasses/NotFoundError');

const notFindPage = async (req, res, next) => {
  next(new NotFoundError('По запросу ничего не найдено'));
};

module.exports = { notFindPage };

const mongoose = require('mongoose');
const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = require('../utils/errorsStatusCodes');
const NotFoundError = require('../utils/customErrorsClasses/NotFoundError');
const ConflictError = require('../utils/customErrorsClasses/ConflictError');
const BadRequestError = require('../utils/customErrorsClasses/BadRequestError');
const ValidationError = require('../utils/customErrorsClasses/ValidationError');

const errorsHandler = (err, req, res, next) => {
  let error;
  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    error = new NotFoundError('По запросу ничего не найдено');
  } else if (err.code === 11000) {
    error = new ConflictError('Пользователь с таким email уже существует');
  } else if (err instanceof mongoose.Error.CastError) {
    error = new BadRequestError('Переданы некорректные данные');
  } else if (err instanceof mongoose.Error.ValidationError) {
    error = new ValidationError('Переданы некорректные данные');
  } else if (err.code === 500) {
    res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
      message: 'Произошла ошибка',
    });
    // eslint-disable-next-line no-console
    console.log({ error: err.message });
    next();
    return;
  } else {
    error = err;
  }
  res.status(error.statusCode).send({
    message: error.message,
  });
  next();
};

module.exports = errorsHandler;

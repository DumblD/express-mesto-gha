const {
  badRequestErrorStatusCode,
  unauthorizedErrorStatusCode,
  forbiddenErrorStatusCode,
  notFoundErrorStatusCode,
  conflictErrorStatusCode,
  internalServerErrorStatusCode,
} = require('../utils/errorsStatusCodes');

const errorsHandler = (err, req, res, next) => {
  if (err.message === 'NotFound') {
    res.status(notFoundErrorStatusCode).send({
      message: 'По запросу ничего не найдено',
    });
  } else if (err.code === 11000) {
    res.status(conflictErrorStatusCode).send({
      message: 'Пользователь с таким email уже существует',
    });
  } else if (err.message === 'Unauthorized') {
    res.status(unauthorizedErrorStatusCode).send({
      message: 'Неуспешная авторизация',
    });
  } else if (err.name === 'CastError') {
    res.status(badRequestErrorStatusCode).send({
      message: 'Передан невалидный _id',
    });
  } else if (err.message.toLowerCase().includes('validation')) {
    res.status(badRequestErrorStatusCode).send({
      message: 'Переданы некорректные данные',
    });
  } else if (err.message === 'Forbidden') {
    res.status(forbiddenErrorStatusCode).send({
      message: 'Недостаточно прав',
    });
  } else if (err.message === 'TestMessageErrorToken') {
    res.status(418).send({
      message: 'TestMessageErrorToken',
    });
  } else if (err.message === 'TokenError') {
    res.status(429).send({
      message: 'TokenError',
    });
  } else {
    res.status(internalServerErrorStatusCode).send({
      message: 'Произошла ошибка',
      errMessage: err.message,
      errCode: err.errCode,
    });
  }
  next();
};

module.exports = errorsHandler;

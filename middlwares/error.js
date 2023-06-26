const {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_CONFLICT,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = require('../utils/errorsStatusCodes');

const errorsHandler = (err, req, res, next) => {
  if (err.message === 'NotFound') {
    res.status(HTTP_STATUS_NOT_FOUND).send({
      message: 'По запросу ничего не найдено',
    });
  } else if (err.code === 11000) {
    res.status(HTTP_STATUS_CONFLICT).send({
      message: 'Пользователь с таким email уже существует',
    });
  } else if (err.message === 'Unauthorized') {
    res.status(HTTP_STATUS_UNAUTHORIZED).send({
      message: 'Неуспешная авторизация',
    });
  } else if (err.name === 'CastError') {
    res.status(HTTP_STATUS_BAD_REQUEST).send({
      message: 'Передан невалидный _id',
    });
  } else if (err.name === 'ValidationError') {
    res.status(HTTP_STATUS_BAD_REQUEST).send({
      message: 'Переданы некорректные данные',
    });
  } else if (err.message === 'Forbidden') {
    res.status(HTTP_STATUS_FORBIDDEN).send({
      message: 'Недостаточно прав',
    });
  } else {
    res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
      message: 'Произошла ошибка',
    });
    // eslint-disable-next-line no-console
    console.log({ error: err.message });
  }
  next();
};

module.exports = errorsHandler;

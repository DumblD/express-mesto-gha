const {
  notFoundErrorStatusCode,
  badRequestErrorStatusCode,
  internalServerErrorStatusCode,
} = require('./errorsStatusCodes');

const sendError = (err, res) => {
  if (err.message === 'NotFound') {
    res.status(notFoundErrorStatusCode).send({
      message: 'По запросу ничего не найдено',
    });
  } else if (err.name === 'CastError') {
    res.status(badRequestErrorStatusCode).send({
      message: 'Передан невалидный _id',
    });
  } else if (err.message.toLowerCase().includes('validation')) {
    res.status(badRequestErrorStatusCode).send({
      message: 'Переданы некорректные данные',
    });
  } else {
    res.status(internalServerErrorStatusCode).send({
      message: 'Произошла ошибка',
    });
  }
};

module.exports = {
  sendError,
};

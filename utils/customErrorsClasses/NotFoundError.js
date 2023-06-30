const { HTTP_STATUS_NOT_FOUND } = require('../errorsStatusCodes');

class NotFoundError extends Error {
  constructor(err) {
    super(err);
    this.message = 'По запросу ничего не найдено';
    this.statusCode = HTTP_STATUS_NOT_FOUND;
  }
}

module.exports = NotFoundError;

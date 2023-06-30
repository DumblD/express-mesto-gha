const { HTTP_STATUS_BAD_REQUEST } = require('../errorsStatusCodes');

class ValidationError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Переданы некорректные данные';
    this.statusCode = HTTP_STATUS_BAD_REQUEST;
  }
}

module.exports = ValidationError;

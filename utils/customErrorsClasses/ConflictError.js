const { HTTP_STATUS_CONFLICT } = require('../errorsStatusCodes');

class ConflictError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Пользователь с таким email уже существует';
    this.statusCode = HTTP_STATUS_CONFLICT;
  }
}

module.exports = ConflictError;

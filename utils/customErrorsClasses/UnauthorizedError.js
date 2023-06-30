const { HTTP_STATUS_UNAUTHORIZED } = require('../errorsStatusCodes');

class UnauthorizedError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Неуспешная авторизация';
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;

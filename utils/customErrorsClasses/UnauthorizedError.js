const { HTTP_STATUS_UNAUTHORIZED } = require('../errorsStatusCodes');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;

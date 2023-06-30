const { HTTP_STATUS_FORBIDDEN } = require('../errorsStatusCodes');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_FORBIDDEN;
  }
}

module.exports = ForbiddenError;

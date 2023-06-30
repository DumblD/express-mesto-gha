const { HTTP_STATUS_BAD_REQUEST } = require('../errorsStatusCodes');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_STATUS_BAD_REQUEST;
  }
}

module.exports = ValidationError;

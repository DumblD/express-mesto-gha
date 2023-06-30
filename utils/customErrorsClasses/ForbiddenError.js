const { HTTP_STATUS_FORBIDDEN } = require('../errorsStatusCodes');

class ForbiddenError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Недостаточно прав';
    this.statusCode = HTTP_STATUS_FORBIDDEN;
  }
}

module.exports = ForbiddenError;

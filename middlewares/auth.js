const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/customErrorsClasses/UnauthorizedError');

const auth = async (req, res, next) => {
  let payload;
  const token = req.cookies.jwt;
  try {
    payload = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
  } catch (err) {
    next(new UnauthorizedError('Неуспешная авторизация'));
    return;
  }
  req.user = payload;
  next();
};

module.exports = auth;

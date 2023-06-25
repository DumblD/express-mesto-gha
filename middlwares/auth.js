const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  let payload;
  try {
    if (!req.cookies.jwt
      || typeof req.cookies.jwt !== 'string'
      || !(/^[A-Za-z0-9_.]+$/.test(req.cookies.jwt))) {
      throw new Error('TestMessageErrorToken');
    }
    const token = req.cookies.jwt;
    try {
      payload = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    } catch (err) {
      throw new Error('TokenError');
    }
  } catch (err) {
    next(err);
  }

  req.user = payload;
  next();
};

module.exports = auth;

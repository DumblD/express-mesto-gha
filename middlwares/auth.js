const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  let payload;
  try {
    if (!req.cookies.jwt
      || typeof req.cookies.jwt !== 'string'
      || !(/^[A-Za-z0-9_.]+$/.test(req.cookies.jwt))) {
      throw new Error('Unauthorized');
    }
    const token = req.cookies.jwt;
    try {
      payload = jwt.verify(token, 'secret-key');
    } catch (err) {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    next(err);
  }

  req.user = payload;
  next();
};

module.exports = auth;

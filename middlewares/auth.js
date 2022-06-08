const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Указан неверный логин или пароль'));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new UnauthorizedError('Указан неверный логин или пароль'));
  }

  req.user = payload;

  next();
};

const createError = require('http-errors');
const services = require('../modules/auth/services/index');

module.exports = async (req, res, next) => {
  const lecturer = await services.lecturer.getByToken(
    req.headers['x-auth-token'],
  );
  if (!lecturer) {
    next(createError(401, 'Unauthorized'));
  }
  req.lecturer = lecturer;
  next();
};

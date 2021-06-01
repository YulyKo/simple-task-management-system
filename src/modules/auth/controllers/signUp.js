const createError = require('http-errors');
const log = require('../../../utils/logger')(__filename);
const services = require('../services');

function checkExistUser(userEmail) {
  // create status from db by email
  // false => email exist and user also
  return services.email.checkEmailExisting(userEmail);  
}

function sendError(res) {
  res.status(409).send({ message: 'user already exist' });
}

// async function createUser(req, res) {
// }

module.exports = async (req, res, next) => {
  log.info('registration user');
  try {
    const existUserStatus = await checkExistUser(req.body.email);
    if (existUserStatus) {
      sendError(res);
      return false;
    }
    const newUser = await services.signUp.create(req.body);
    res.send({ token: newUser.token });
  } catch (error) {
    log.error(error.message);
    next(createError(500, error.message));
  }
  return true;
};

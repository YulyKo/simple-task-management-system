const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

function checkEmpty(bodyToken) {
  return ( bodyToken === undefined ||
    bodyToken.length === 0
  );
}

function getCodeValidateError(err) {
  let resCode;
  if (err.message === 'jwt expired') resCode = 201; // 201 code for generate new token
  if (err.message !== 'jwt expired') resCode = 403; // haven't access -> old token
  else resCode = 201; // all is ok AND code for generate new token
  return resCode;
}

module.exports = {
  generateJWT(email) {
    return jwt.sign({ email: email }, config.secret , { expiresIn: '2h' });
    // return jwt.sign(JSON.stringify(email), config.secret, { expiresIn: 60 * 60, algorithm: 'HS256' });
    // return jwt.sign(email, '' + config.secret, { expiresIn: 60 * 60 });
  },

  verifyJWT(bodyToken) {
    let resCode;

    jwt.verify(bodyToken, config.secret, (err) => {
      resCode = getCodeValidateError(err);
    });
    if (checkEmpty(bodyToken)) { resCode = 401; } // Unauthorized || token emply
    return resCode;
  },
};
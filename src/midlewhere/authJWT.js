const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

const secret = env === 'production' ? process.env.SECRET : config.secret;

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'].replace('Bearer ', '');
  if (!token) {
    return res.status(403).send({
      message: 'No token provided!'
    });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({
        message: 'Unauthorized!'
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJWT = {
  verifyToken: verifyToken,
};

module.exports = authJWT;

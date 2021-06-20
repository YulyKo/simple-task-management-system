const db = require('../../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

module.exports = {
  registration(req, res) {
    const token = jwt.sign({ email: req.body.email }, config.secret);
    console.log('body -> ', req.body);
    console.log('token -> ', token);
    console.log('bcrypt.hashSync-> ', bcrypt.hashSync(req.body.password, 8));
    return db.users
      .create({
        username: req.body.username,
        email: req.body.email,
        confirmed: false,
        passwordHash: bcrypt.hashSync(req.body.password, 8),
      })
      .then(() => res.status(201).send(token))
      .catch((error) => {
        res.status(400).send(error);
        console.log(error);
      });
  },
};

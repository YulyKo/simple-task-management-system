const db = require('../../models/index');
const passwordHash = require('password-hash');
const { sendMail: sendEmail } = require('./mail');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];

function findByEmail(email) {
  return db.users
    .findOne({ where: { email: email } })
    .then(user => { return user; })
    .catch(error => { return error; });
}

function changePasswordEquals(dbPassword, bodyPassword) {
  return passwordHash.verify(bodyPassword, dbPassword);
}

function getToken(email) {
  // create token
  const token = jwt.sign({ email: email }, config.secret , { expiresIn: 86400  });
  return token;
}

module.exports = {
  registration(req, res) {
    return db.users
      .create({
        username: req.body.username,
        email: req.body.email,
        confirmed: false,
        passwordHash: passwordHash.generate(req.body.password),
      })
      .then((user) => {
        const code = Buffer.from(user.email).toString('base64'); // code is base64 of email
        sendEmail(user.username, user.email, code);
        res.send({ accessToken: getToken(user.email) });
      })
      .catch((error) => {
        res.status(500).send(error.message);
      });
  },

  login(req, res) {
    findByEmail(req.body.email)
    .then((user) => {

      // check exist user
      if (!user) {
        res.status(404).send({ mesage: 'User is not exists' });
      }

      // check equals password
      const passwordEqualsStatus = changePasswordEquals(user.dataValues.passwordHash, req.body.password);
      if (!passwordEqualsStatus) {
        res.status(401).send({
          accessToken: null,
          mesage: 'Password is not correct'
        });
      }

      res.status(201).send({
        username: user.username,
        email: user.email,
        accessToken: getToken(user.email),
      });
    })
    .catch(error => res.status(500).send(error.message));
  },

  confirmUser(req, res) {
    const bodyCode = Buffer.from(req.params.code, 'base64').toString();
    return findByEmail(bodyCode)
      .then((user) => {
        if(user) db.users.update(
          {
            confirmed: true },
            { where: { email: bodyCode }
          }
        );
        res.status(201).send(user);
      })
      .catch((error) => res.status(500).send(error.message));
  },

  refresh(req, res) {
    const email = req.params.email;
    return findByEmail(email)
      .then((user) => {
        // check exist user
        if (!user) {
          res.status(404).send({ mesage: 'User is not exists' });
        }

        // send new token
        res.status(201).send({ accessToken: getToken(email) });
      })
      .catch((error) => res.status(500).send(error.mesage));
  },
};

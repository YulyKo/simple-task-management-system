const db = require('../../models/index');
const passwordHash = require('password-hash');
const token = require('./token');
const { sendEmail } = require('./email');

function findByEmail(email) {
  return db.users
    .findOne({ where: { email: email } })
    .then(user => { return user; })
    .catch(error => { return error; });
}

function changePasswordEquals(dbPassword, bodyPassword) {
  return passwordHash.verify(bodyPassword, dbPassword);
}

module.exports = {
  registration(req, res) {
    const accessToken = token.generateJWT({ username: req.body.username });
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
        // send token to client
        res.status(201).send(accessToken);
      })
      .catch((error) => {
        res.status(400).send(error.message);
      });
  },

  login(req, res) {
    findByEmail(req.body.email)
    .then((user) => {
      if (user) {
        // check equals password
        const passwordEqualsStatus = changePasswordEquals(user.dataValues.passwordHash, req.body.password);
        if (passwordEqualsStatus === false) {
          res.status(201).send({ mesage: 'Password is not correct' });
        }
        // check token
        let codeStatus = token.verifyJWT(req.body.token);
        if( +codeStatus === 201 ) {
          res.status(201).send({
            accessToken: token.generateJWT(req.body.email),
            confirmed: user.confirmed,
          });
        } else {
          res.status(codeStatus).send();
        }
      } else res.status(400).send({ mesage: 'User is not exists' });
    })
    .catch(error => res.status(400).send(error.message));
  },

  confirmUser(req, res) {
    const bodyCode = Buffer.from(req.params.code, 'base64').toString();
    return findByEmail(bodyCode)
      .then((user) => {
        if(user) db.users.update({ confirmed: true }, { where: { email: bodyCode } });
        res.status(201).send(user);
      })
      .catch((error) => res.status(400).send(error.message));
  },
};

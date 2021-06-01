const router = require('express').Router();
const controller = require('../../modules/auth/controllers/index');

const schema = require('./validators/index');
const { validator } = require('../../utils');

router.post(
  '/registration',
  validator(schema.registration),
  controller.signUp
);

// router.post('/login', validator(schema.login), controller.signIn);

// router.post('/email', validator(schema.email), controller.auth.email);

module.exports = router;

const ajv = require('ajv')();

const schema = ajv.compile({
  type: 'object',
  required: ['email', 'username', 'password'],
  properties: {
    email: { type: 'string', format: 'email' },
    username: { type: 'string' },
    password: { type: 'string', minLength: 6 }
  }
});

module.exports = schema;

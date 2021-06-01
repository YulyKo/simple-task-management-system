const ajv = require('ajv')();

const schema = ajv.compile({
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 }
  }
});

module.exports = schema;

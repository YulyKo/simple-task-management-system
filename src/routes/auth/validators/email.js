const ajv = require('ajv')();

const schema = ajv.compile({
  type: 'object',
  required: ['email'],
  properties: {
    email: { type: 'string', format: 'email' }
  }
});

module.exports = schema;

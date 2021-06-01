require('dotenv').config();

const joi = require('joi');

const schema = joi
  .object()
  .options({ abortEarly: false })
  .keys({
    NODE_ENV: joi.string(),
    HOST: joi.string(),
    PORT: joi.number(),
    SECRET: joi.string(),
    DBHOST: joi.string(),
    DBNAME: joi.string(),
    DBUSER: joi.string(),
    DBPASSWORD: joi.string(),
    DATABASE_URL: joi.string().required(),
  })
  .unknown()
  .required();

const { error, value: envVars } = schema.validate(process.env);

if (error) {
  throw error.message;
}

const config = Object.freeze(JSON.parse(JSON.stringify(envVars)));

module.exports = config;

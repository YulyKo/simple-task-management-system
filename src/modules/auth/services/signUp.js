const { knex } = require('../../../db');
const crypto = require('crypto');
const config = require('../../../config');
const logger = require('../../../utils/logger')(__filename);

async function create(newUserData) {
  const { email, password, username } = newUserData;
  const hash = crypto
    .pbkdf2Sync(password, config.SECRET, 1000, 64, 'sha512')
    .toString('hex');

  logger.info(hash);
  const [res] = await knex('users')
    .insert({
      email,
      hash,
      username,
      confirmed: false,
      token: knex.raw('uuid_generate_v4()'),
    })
    .returning(['token', 'email']);

  // const hash = Buffer.from(email).toString('base64');
  return res;
}

module.exports = {
  create,
};

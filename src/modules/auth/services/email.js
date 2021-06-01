const { default: knex } = require('knex');

module.exports.checkEmailExisting = async (email) => {
  try {
      const [res] = await knex('users')
        .select('email')
        .where({
          email
        });
      return res ? true : false;
  } catch (error) {
    return false;
  }
};

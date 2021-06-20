'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {}
  users.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    confirmed: DataTypes.BOOLEAN,
    passwordHash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  users.removeAttribute('id');
  return users;
};
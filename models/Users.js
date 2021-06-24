'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {}
  Users.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        // eslint-disable-next-line no-useless-escape
        is: ['^[a-zA-Z а-яА-Я\-]+$','i'],
      },
    },
    email: {
      primaryKey: true,
      unique: {
        args: [true],
        msg: 'exist',
      },
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  Users.removeAttribute('id');
  return Users;
};
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          is: ['^[a-zA-Zа-яА-ЯІЇЄҐҐ- ]+$','gm'],
        }
      },
      email: {
        primaryKey: true,
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        },
      },
      confirmed: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      passwordHash: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      freezeTableName: true
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
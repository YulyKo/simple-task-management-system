'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      dueDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      isDone: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      priority: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      // ownerId here
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('tasks');
  }
};

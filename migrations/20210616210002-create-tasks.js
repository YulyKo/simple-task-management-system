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
      // have error becauce first mograte tasks and cant found users model
      owner: {
        type: Sequelize.STRING,
        references: {
          model: 'users',
          key: 'email',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    }).then(() => queryInterface.addConstraint(
      'tasks',
      ['email'],
      {
        type: 'foreign key',
        name: 'owner',
        references: {
          table: 'users',
          field: 'email',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    ));
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('tasks');
  }
};
// return queryInterface.sequelize.query("ALTER TABLE app_users ADD CONSTRAINT unique_user_email UNIQUE (email,column2,column3);")
  
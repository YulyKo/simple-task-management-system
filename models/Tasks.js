'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Tasks.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    isDone: DataTypes.BOOLEAN,
    priority: DataTypes.INTEGER,
    owner: {
      type: DataTypes.STRING,
      references: {
        model: 'users',
        key: 'email',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    }, {
    sequelize,
    modelName: 'tasks',
  });
};

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {}
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
  return Tasks;
};

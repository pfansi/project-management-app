const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    task_title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 25],
      },
    },
    task_description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [10, 200],
      },
    },
    task_deadline: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['not_started', 'in_progress', 'completed'],
      defaultValue: 'not_started',
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'task',
  }
);

module.exports = Task;

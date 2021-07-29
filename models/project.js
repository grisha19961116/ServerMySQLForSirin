"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      Project.belongsTo(models.User, {
        foreignKey: "owner",
        onDelete: "CASCADE",
      });
    }
  }
  Project.init(
    {
      name: DataTypes.STRING,
      project: DataTypes.STRING,
      url: DataTypes.STRING,
      stars: DataTypes.INTEGER,
      forks: DataTypes.INTEGER,
      problems: DataTypes.INTEGER,
      data: DataTypes.INTEGER,
      owner: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};

"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Projects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      project: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
      },
      stars: {
        type: Sequelize.INTEGER,
      },
      forks: {
        type: Sequelize.INTEGER,
      },
      problems: {
        type: Sequelize.INTEGER,
      },
      data: {
        type: Sequelize.INTEGER,
      },
      owner: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Projects");
  },
};

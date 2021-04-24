"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Tracks", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
      },
      name: Sequelize.STRING,
      duration: Sequelize.FLOAT,
      timesPlayed: Sequelize.INTEGER,
      albumId: {
        type: Sequelize.STRING,
        references: {
          model: "Albums",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Tracks");
  },
};

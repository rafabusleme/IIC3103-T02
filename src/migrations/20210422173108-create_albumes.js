"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Albums", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
      },
      name: Sequelize.STRING,
      genre: Sequelize.STRING,
      artistId: {
        type: Sequelize.STRING,
        references: {
          model: "Artists",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Albums");
  },
};

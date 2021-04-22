"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Albumes", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
      },
      name: Sequelize.STRING,
      genre: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Albumes");
  },
};

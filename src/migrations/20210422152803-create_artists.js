module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Artists", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
      },
      name: Sequelize.STRING,
      age: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Artists");
  },
};

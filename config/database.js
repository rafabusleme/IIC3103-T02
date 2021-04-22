const { Sequelize } = require("sequelize");

module.exports = new Sequelize("tarea2_api", "rafael", "password", {
  host: "localhost",
  dialect: "postgres",
});

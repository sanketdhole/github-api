const { Sequelize } = require("sequelize");

let sequelize = new Sequelize("githubapi", "root", "1234", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;

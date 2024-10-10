const { Sequelize } = require("sequelize");

const config = {
  database: "database_name",
  username: "username",
  password: "password",
  options: {
    host: "localhost",
    dialect: "sqlite",
    storage: "./nvwebblog-db.sqlite",
    define: {
      freezeTableName: true,
    },
  },
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config.options
);

module.exports = sequelize;

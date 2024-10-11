const { Sequelize } = require("sequelize");

const config = {
  database: "nvwebblog-db",
  username: "",
  password: "",
  options: {
    host: "localhost",
    dialect: "sqlite",
    storage: "./nvwebblog-db.sqlite",
    logging: false,
    define: {
      freezeTableName: true, // ใช้เพื่อป้องกันการเปลี่ยนชื่อตารางเป็นพหูพจน์
    },
  },
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config.options
);

module.exports = {
  sequelize, // ส่งออก instance ของ Sequelize
  port: 3000,
  jwtSecret: "4321",
};

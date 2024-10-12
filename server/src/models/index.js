const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require("../config/config"); // ดึง config ที่เก็บค่า dialect และอื่นๆ
const env = process.env.NODE_ENV || "development"; // ใช้ environment ปัจจุบัน (development เป็นค่า default)
const dbConfig = config[env]; // ดึง config ตาม environment

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect, // ใช้ dialect จาก config
    storage: dbConfig.storage, // ถ้าใช้ sqlite ต้องระบุ storage ด้วย
    logging: false, // ปิดการแสดง log ของ sequelize
  }
);

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf(".") !== 0 && file !== "index.js")
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

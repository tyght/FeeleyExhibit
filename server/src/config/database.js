const { Sequelize } = require("sequelize");

// ตั้งค่าการเชื่อมต่อฐานข้อมูล
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./nvwebblog-db.sqlite", // ที่อยู่ของไฟล์ฐานข้อมูล
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;

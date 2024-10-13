module.exports = {
  development: {
    username: "root",
    password: null,
    database: "database_development",
    host: "127.0.0.1",
    dialect: "sqlite", // กำหนดให้ใช้ sqlite
    storage: "./database.sqlite",
    jwtSecret: "your_development_secret_key", // เพิ่ม jwtSecret
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "sqlite",
    storage: "./test.sqlite",
    jwtSecret: "your_test_secret_key", // เพิ่ม jwtSecret
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    jwtSecret: process.env.JWT_SECRET || "your_production_secret_key", // เพิ่ม jwtSecret
  },
};

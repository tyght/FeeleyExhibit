// server/src/config/config.js
module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "nvWebblogDb",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "sqlite",
    storage: "./nvwebblog-db.sqlite",
    port: process.env.PORT || 8081,
    jwtSecret: process.env.JWT_SECRET || "your_development_secret",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "sqlite",
    storage: "./nvwebblog-db.sqlite",
    port: process.env.PORT || 8081,
    jwtSecret: process.env.JWT_SECRET || "your_production_secret",
  },
};

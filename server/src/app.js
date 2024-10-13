require("dotenv").config(); // โหลดค่า .env
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./models");
const config = require("./config/config");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/assets", express.static("public"));

// นำเข้าเส้นทางต่าง ๆ
require("./userPassport");
require("./routes")(app);

// ใช้พอร์ตจาก config หรือค่าเริ่มต้นคือ 8081
let port = config.port || 8081;

// เริ่มการเชื่อมต่อฐานข้อมูลและเริ่มเซิร์ฟเวอร์
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, function () {
      console.log("Server running on " + port);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

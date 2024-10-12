// server/src/app.js
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

require("./userPassport");
require("./routes")(app);

let port = config.port || 8081;

sequelize.sync({ force: false }).then(() => {
  app.listen(port, function () {
    console.log("Server running on " + port);
  });
});

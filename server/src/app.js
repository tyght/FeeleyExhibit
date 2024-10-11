const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./config/config");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/assets", express.static("public"));

// import routes
require("./userPassport");
require("./routes")(app);

let port = 3000;

// sync sequelize and start server
sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(port, function () {
      console.log("Server running on port " + port);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const Sequelize = require("sequelize");
const sequelize = require("../config/config");
const User = require("./User");
const Artwork = require("./Artwork");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Artwork = Artwork;

module.exports = db;

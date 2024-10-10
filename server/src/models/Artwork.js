// models/Artwork.js
const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/config");

class Artwork extends Model {}

Artwork.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Artwork",
  }
);

module.exports = Artwork;

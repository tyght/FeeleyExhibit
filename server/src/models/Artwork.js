const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/config"); // นำเข้า sequelize อย่างถูกต้อง

class Artwork extends Model {}

Artwork.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    artistName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize, // ส่ง sequelize instance ให้กับการกำหนดโมเดล
    modelName: "Artwork",
  }
);

module.exports = Artwork;

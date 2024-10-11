const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/config"); // นำเข้า sequelize อย่างถูกต้อง

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize, // ส่ง sequelize instance ให้กับการกำหนด Model
    modelName: "User",
  }
);

module.exports = User;

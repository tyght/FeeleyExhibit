// server/src/controllers/UserAuthenController.js
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      res.status(201).send(user);
    } catch (err) {
      console.error("Registration Error: ", err);
      res.status(500).send({ error: "มีข้อผิดพลาดในการลงทะเบียนผู้ใช้" });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res
          .status(401)
          .send({ error: "ไม่พบผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .send({ error: "ไม่พบผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
      }

      // ใช้ environment เพื่ออ่านค่า jwtSecret อย่างถูกต้อง
      const environment = process.env.NODE_ENV || "development";
      const jwtSecret = config[environment].jwtSecret;

      const token = jwt.sign({ id: user.id }, jwtSecret, {
        expiresIn: "1h",
      });
      res.status(200).send({ user, token });
    } catch (err) {
      console.error("Login Error: ", err);
      res.status(500).send({ error: "มีข้อผิดพลาดในการเข้าสู่ระบบ" });
    }
  },
};

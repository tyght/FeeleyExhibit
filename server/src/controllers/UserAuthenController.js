const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      // ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
      if (!username || !email || !password) {
        return res.status(400).send({ error: "ข้อมูลไม่ครบถ้วน" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });

      // สร้าง token หลังจากที่ผู้ใช้ถูกสร้าง
      const token = jwt.sign({ id: user.id }, config.jwtSecret, {
        expiresIn: "1h",
      });

      res.status(201).send({ user, token });
    } catch (err) {
      console.error("Error during registration:", err); // ดูข้อผิดพลาดใน console
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

      // สร้าง token หลังจากที่การเข้าสู่ระบบสำเร็จ
      const token = jwt.sign({ id: user.id }, config.jwtSecret, {
        expiresIn: "1h",
      });

      res.status(200).send({ user, token });
    } catch (err) {
      console.error("Error during login:", err);
      res.status(500).send({ error: "มีข้อผิดพลาดในการเข้าสู่ระบบ" });
    }
  },
};

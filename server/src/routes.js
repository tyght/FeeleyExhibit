//routes.js
const UserController = require("./controllers/UserController");
const UserAuthenController = require("./controllers/UserAuthenController");
const isAuthenController = require("./authen/isAuthenController");
const ArtworkController = require("./controllers/ArtworkController");

const multer = require("multer");
const path = require("path");

// ตั้งค่า multer เพื่อจัดเก็บไฟล์
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads");
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// ตรวจสอบชนิดไฟล์ที่รองรับ
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

// ตั้งค่า multer ให้รองรับการอัปโหลดหลายไฟล์
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // จำกัดขนาดไฟล์ที่ 5MB
  fileFilter: fileFilter,
}).array("artworkPhotos", 10); // กำหนดให้อัปโหลดได้สูงสุด 10 ไฟล์

module.exports = (app) => {
  // ดึงผลงานศิลปะทั้งหมด (public)
  app.get("/artworks", ArtworkController.index);

  // ลงทะเบียนผู้ใช้
  app.post("/user", UserAuthenController.register);

  // เข้าสู่ระบบ
  app.post("/login", UserAuthenController.login);

  // อัปโหลดไฟล์
  app.post("/upload", isAuthenController, function (req, res) {
    upload(req, res, function (err) {
      if (err) {
        return res.status(400).send({ error: "Error uploading files." });
      }
      res.status(200).send({ message: "Files are uploaded" });
    });
  });

  // สร้างผลงานศิลปะ
  app.post("/artwork", isAuthenController, ArtworkController.create);

  // ดึงผลงานศิลปะของผู้ใช้ปัจจุบัน (ต้องตรวจสอบสิทธิ์)
  app.get("/my-artworks", isAuthenController, ArtworkController.getMyArtworks);

  // ลบไฟล์ที่อัปโหลด
  app.post("/upload/delete", isAuthenController, async function (req, res) {
    try {
      const fs = require("fs");
      const filePath = process.cwd() + "/public/uploads/" + req.body.filename;

      if (!req.body.filename) {
        return res.status(400).send({ error: "Filename is required" });
      }

      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) throw err;
          res.status(200).send("Delete successful");
        });
      } else {
        res.status(404).send("File not found");
      }
    } catch (err) {
      res.status(500).send({
        error: "An error has occurred trying to delete the file",
      });
    }
  });
};

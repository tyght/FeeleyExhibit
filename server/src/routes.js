const UserController = require("./controllers/UserController");
const UserAuthenController = require("./controllers/UserAuthenController");
const isAuthenController = require("./authen/isAuthenController");
const ArtworkController = require("./controllers/ArtworkController");
const multer = require("multer");
const path = require("path");

// ตรวจสอบว่ามีเพียงไฟล์ภาพเท่านั้นที่ถูกอัปโหลด
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads");
  },
  filename: function (req, file, callback) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, uniqueSuffix + path.extname(file.originalname)); // เพิ่ม unique ชื่อไฟล์
  },
});

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

let upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // จำกัดขนาดไฟล์ที่ 5MB
  fileFilter: fileFilter,
}).array("artworkPhotos", 10);

module.exports = (app) => {
  // User routes
  app.get("/users", isAuthenController, UserController.index);
  app.get("/user/:userId", UserController.show);
  app.post("/user", UserAuthenController.register); // ใช้ฟังก์ชัน register
  app.put("/user/:userId", UserController.put);
  app.delete("/user/:userId", UserController.remove);
  app.post("/login", UserAuthenController.login);

  // Artwork routes
  app.post("/artwork", isAuthenController, ArtworkController.create);
  app.put("/artwork/:artworkId", isAuthenController, ArtworkController.put);
  app.delete(
    "/artwork/:artworkId",
    isAuthenController,
    ArtworkController.remove
  );
  app.get("/artwork/:artworkId", ArtworkController.show);
  app.get("/artworks", ArtworkController.index);

  // Upload routes (เพิ่ม isAuthenController เพื่อตรวจสอบการล็อกอิน)
  app.post("/upload", isAuthenController, function (req, res) {
    upload(req, res, function (err) {
      if (err) {
        return res.status(400).send("Error uploading file.");
      }
      res.status(200).send("File is uploaded");
    });
  });

  // Delete uploaded file route
  app.post("/upload/delete", isAuthenController, async function (req, res) {
    try {
      const fs = require("fs");
      const filePath = process.cwd() + "/public/uploads/" + req.body.filename;

      // ตรวจสอบว่าไฟล์มีอยู่หรือไม่ก่อนทำการลบ
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

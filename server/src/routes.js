const UserController = require("./controllers/UserController");
const UserAuthenController = require("./controllers/UserAuthenController");
const isAuthenController = require("./authen/isAuthenController"); // ตรวจสอบว่าถูก import
const ArtworkController = require("./controllers/ArtworkController");
const multer = require("multer");

// upload section
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads");
  },
  filename: function (req, file, callback) {
    console.log(file);
    callback(null, file.originalname);
  },
});
let upload = multer({ storage: storage }).array("artworkPhotos", 10);

module.exports = (app) => {
  app.get("/users", isAuthenController, UserController.index);
  app.get("/user/:userId", UserController.show);
  app.post("/user", UserAuthenController.register); // แก้ไขให้ถูกต้อง
  app.put("/user/:userId", UserController.put);
  app.delete("/user/:userId", UserController.remove);
  app.post("/login", UserAuthenController.login);

  app.post("/artwork", ArtworkController.create);
  app.put("/artwork/:artworkId", ArtworkController.put);
  app.delete("/artwork/:artworkId", ArtworkController.remove);
  app.get("/artwork/:artworkId", ArtworkController.show);
  app.get("/artworks", ArtworkController.index);

  app.post("/upload", function (req, res) {
    upload(req, res, function (err) {
      if (err) {
        return res.end("Error uploading file.");
      }
      res.end("File is uploaded");
    });
  });

  app.post("/upload/delete", async function (req, res) {
    try {
      const fs = require("fs");
      console.log(req.body.filename);

      fs.unlink(
        process.cwd() + "/public/uploads/" + req.body.filename,
        (err) => {
          if (err) throw err;
          res.send("Delete successful");
        }
      );
    } catch (err) {
      res.status(500).send({
        error: "An error has occurred trying to delete the material file",
      });
    }
  });
};

// routes.js
const UserAuthenController = require("./controllers/UserAuthenController");
const ArtworkController = require("./controllers/ArtworkController");
const isAuthenController = require("./authen/isAuthenController");
let multer = require("multer");

// upload section
let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
let upload = multer({ storage: storage }).single("artworkImage");

module.exports = (app) => {
  app.post("/register", UserAuthenController.register);
  app.post("/login", UserAuthenController.login);

  app.post("/artworks", isAuthenController, upload, ArtworkController.create);
  app.get("/artworks", ArtworkController.index);
  app.get("/artworks/:artworkId", ArtworkController.show);
  app.put("/artworks/:artworkId", isAuthenController, ArtworkController.update);
  app.delete(
    "/artworks/:artworkId",
    isAuthenController,
    ArtworkController.remove
  );

  app.post("/upload", isAuthenController, function (req, res) {
    upload(req, res, function (err) {
      if (err) {
        return res.status(500).send("Error uploading file.");
      }
      res.status(200).send("File is uploaded");
    });
  });
};

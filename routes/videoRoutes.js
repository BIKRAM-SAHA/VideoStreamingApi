const { Router } = require("express");
const { upload } = require("../helpers/multer");
const {
  getAll,
  uploadVideo,
  downloadVideo,
  streamVideo,
} = require("../controllers/videoController");

const router = Router();

router
  .get("/all", getAll)
  .post("/upload", upload.single("video"), uploadVideo)
  .get("/download/:id", downloadVideo)
  .get("/stream/:id", streamVideo);

module.exports = router;

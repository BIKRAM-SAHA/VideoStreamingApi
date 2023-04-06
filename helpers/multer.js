const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("temp/")) {
      fs.mkdirSync("temp/", {
        recursive: true,
      });
    }
    cb(null, "temp/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };

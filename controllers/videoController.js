const fs = require("fs");
const path = require("path");

// route: GET /video/all
// access: public
const getAll = (req, res) => {
  const fileNameArray = [];
  fs.readdir(path.resolve("./temp"), (err, files) => {
    files.forEach((file) => {
      fileNameArray.push(file);
    });
    res.send(fileNameArray);
  });
};

// route: POST /video/upload
// access: public
const uploadVideo = (req, res) => {
  res.send(req.file.filename);
};

// route: GET /download/:id
// access: public
const downloadVideo = (req, res) => {
  const { id } = req.params;
  if (!fs.existsSync(`temp/${id}`)) {
    res.status(404);
    res.send("File Does not Exists!");
  }
  const file = `${__dirname}/../temp/${id}`;
  res.download(file);
};

// route: GET /stream/:id
// access: public
const streamVideo = (req, res) => {
  const { id } = req.params;
  if (!fs.existsSync(`temp/${id}`)) {
    res.status(404);
    res.send("File Does not Exists!");
  }
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range Header");
  }
  const videoPath = `${__dirname}/../temp/${id}`;
  const videoSize = fs.statSync(videoPath).size;

  const CHUNK_SIZE = 10 ** 6;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
};

module.exports = { getAll, uploadVideo, downloadVideo, streamVideo };

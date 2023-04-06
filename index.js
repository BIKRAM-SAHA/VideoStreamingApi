require("dotenv").config();
const cors = require("cors");
const express = require("express");
const videoRoutes = require("./routes/videoRoutes");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server Running!");
});

app.use("/video", videoRoutes);

app.listen(5000, () => {
  console.log("Server Started");
});

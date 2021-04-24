require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

/* Routes */
const artist = require("./src/routes/artist");
const album = require("./src/routes/album");
const track = require("./src/routes/track");

const app = express();

app.use(bodyParser.json());

app.use("/artists", artist);
app.use("/albums", album);
app.use("/tracks", track);

app.get("/", (req, res) => {
  res.send("T02 - Taller de integración");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

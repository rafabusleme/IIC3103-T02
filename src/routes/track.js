const express = require("express");

const db = require("../models/index");
const { createTrackResponse } = require("../utils");

const router = express();

router.get("/", async (req, res) => {
  try {
    const tracks = await db.Track.findAll({
      include: [
        {
          model: db.Album,
        },
      ],
    });
    const response = tracks.map((track) =>
      createTrackResponse(track, track.Album.artistId)
    );
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/:trackId", async (req, res) => {
  try {
    const { trackId } = req.params;

    const track = await db.Track.findByPk(trackId);
    if (!track) return res.status(404).send("canción no encontrada");

    const album = await db.Album.findByPk(track.albumId);
    if (!album) return res.status(404).send("ocurrió un error");

    const response = createTrackResponse(track, album.artistId);
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.put("/:trackId/play", async (req, res) => {
  try {
    const { trackId } = req.params;

    const track = await db.Track.findByPk(trackId);
    if (!track) return res.status(404).send("canción no encontrada");

    await db.Track.increment("timesPlayed", {
      where: { id: trackId },
    });

    res.status(200).send("canción reproducida");
  } catch (error) {
    res.status(404).send(error);
  }
});

router.delete("/:trackId", async (req, res) => {
  try {
    const { trackId } = req.params;

    const isRemoved = await db.Track.destroy({ where: { id: trackId } });
    console.log(isRemoved);

    if (isRemoved) return res.status(204).send("canción eliminada");
    res.status(404).send("canción inexistente");
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;

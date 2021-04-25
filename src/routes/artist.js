const express = require("express");

const db = require("../models/index");
const {
  createId,
  createArtistResponse,
  createAlbumResponse,
  createTrackResponse,
} = require("../utils");

const router = express();

router.get("/", async (req, res) => {
  try {
    const artistList = await db.Artist.findAll();
    const response = artistList.map((artist) => createArtistResponse(artist));
    res.status(200).json(response);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/:artistId", async (req, res) => {
  try {
    const { artistId } = req.params;

    const artist = await db.Artist.findByPk(artistId);
    if (!artist) return res.status(404).send("artista no encontrado");

    const response = createArtistResponse(artist);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).send("artista no encontrado");
  }
});

router.get("/:artistId/albums", async (req, res) => {
  try {
    const { artistId } = req.params;

    const artist = await db.Artist.findByPk(artistId);
    if (!artist) return res.status(404).send("artista no encontrado");

    const albumes = await db.Album.findAll({ where: { artistId } });

    const response = albumes.map((album) => createAlbumResponse(album));
    res.status(200).json(response);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/:artistId/tracks", async (req, res) => {
  try {
    const { artistId } = req.params;

    const artist = await db.Artist.findByPk(artistId);
    if (!artist) return res.status(404).send("artista no encontrado");

    const tracks = await db.Track.findAll({
      include: [
        {
          model: db.Album,
          where: { artistId },
        },
      ],
    });

    const response = tracks.map((track) =>
      createTrackResponse(track, artistId)
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, age } = req.body;

    if (!name || !age) return res.status(400).send("input inválido");
    if (typeof age != "number") return res.status(400).send("input inválido");

    const id = createId(name);
    const [artist, created] = await db.Artist.findOrCreate({
      where: { id },
      defaults: { name, age },
    });

    const response = createArtistResponse(artist);
    if (!created) return res.status(409).json(response);
    res.status(201).json(response);
  } catch (error) {
    if (error.name == "SequelizeUniqueConstraintError") {
      return res.status(409).send("artista ya existe");
    }
  }
});

router.post("/:artistId/albums", async (req, res) => {
  try {
    const { artistId } = req.params;
    const { name, genre } = req.body;

    if (!name || !genre) return res.status(400).send("input inválido");

    const id = createId(`${name}:${artistId}`);
    const [album, created] = await db.Album.findOrCreate({
      where: { id },
      defaults: { name, genre, artistId },
    });

    const response = createAlbumResponse(album);
    if (!created) return res.status(409).json(response);
    res.status(201).json(response);
  } catch (error) {
    if (error.name == "SequelizeUniqueConstraintError") {
      return res.status(409).send("álbum ya existe");
    }
    if (error.name == "SequelizeForeignKeyConstraintError") {
      return res.status(422).send("artista no existe");
    }
    res.status(404).send(error.name);
  }
});

router.put("/:artistId/albums/play", async (req, res) => {
  try {
    const { artistId } = req.params;

    const artist = await db.Artist.findByPk(artistId);
    if (!artist) return res.status(404).send("artista no encontrado");

    await db.Track.increment("timesPlayed", {
      include: [
        {
          model: db.Album,
          where: { artistId },
        },
      ],
      where: {},
    });

    res.status(200).send("todas las canciones del artista fueron reproducidas");
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.delete("/:artistId", async (req, res) => {
  try {
    const { artistId } = req.params;

    const isRemoved = await db.Artist.destroy({ where: { id: artistId } });

    if (isRemoved) return res.status(204).send("artista eliminado");
    res.status(404).send("artista inexistente");
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;

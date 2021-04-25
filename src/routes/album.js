const express = require("express");
const album = require("../models/album");

const db = require("../models/index");
const {
  createId,
  createTrackResponse,
  createAlbumResponse,
} = require("../utils");

const router = express();

router.get("/", async (req, res) => {
  try {
    const albums = await db.Album.findAll();

    const response = albums.map((album) => createAlbumResponse(album));
    res.status(200).json(response);
  } catch (error) {
    res.status(404).send(error.name);
  }
});

router.get("/:albumId", async (req, res) => {
  try {
    const { albumId } = req.params;

    const album = await db.Album.findByPk(albumId);
    if (!album) return res.status(404).send("álbum no encontrado");

    const response = createAlbumResponse(album);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).send("álbum no encontrado");
  }
});

router.get("/:albumId/tracks", async (req, res) => {
  try {
    const { albumId } = req.params;

    const album = await db.Album.findByPk(albumId);
    if (!album) return res.status(404).send("álbum no encontrado");

    const tracks = await db.Track.findAll({ where: { albumId } });

    const response = tracks.map((track) =>
      createTrackResponse(track, album.artistId)
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(404).send(error.name);
  }
});

router.post("/:albumId/tracks", async (req, res) => {
  try {
    const { albumId } = req.params;
    const { name, duration, times_played } = req.body;

    if (!name || !duration) return res.status(400).send("input inválido");

    const timesPlayed = times_played || 0;
    const id = createId(`${name}:${albumId}`);
    const track = await db.Track.create({
      id,
      name,
      duration,
      albumId,
      timesPlayed,
    });

    const album = await db.Album.findByPk(albumId);
    if (!album) return res.status(422).send("álbum no existe");

    const response = createTrackResponse(track, album.artistId);
    res.status(201).json(response);
  } catch (error) {
    if (error.name == "SequelizeUniqueConstraintError") {
      return res.status(409).send("canción ya existe");
    }
    if (error.name == "SequelizeForeignKeyConstraintError") {
      return res.status(422).send("álbum no existe");
    }
    res.status(404).send(error);
  }
});

router.put("/:albumId/tracks/play", async (req, res) => {
  try {
    const { albumId } = req.params;

    const album = await db.Album.findByPk(albumId);
    if (!album) return res.status(404).send("álbum no encontrado");

    await db.Track.increment("timesPlayed", {
      where: { albumId },
    });

    res.status(200).send("canciones del álbum reproducidas");
  } catch (error) {
    res.status(404).send(error);
  }
});

router.delete("/:albumId", async (req, res) => {
  try {
    const { albumId } = req.params;

    const isRemoved = await db.Album.destroy({ where: { id: albumId } });

    if (isRemoved) return res.status(204).send("álbum eliminado");
    res.status(404).send("álbum no encontrado");
  } catch (error) {
    res.status(404).send("álbum no encontrado");
  }
});

module.exports = router;

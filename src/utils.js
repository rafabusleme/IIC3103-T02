require("dotenv").config({ silent: process.env.NODE_ENV === "production" });
const btoa = require("btoa");

const API_URL = process.env.BASE_URL || "localhost";

const createId = (string) => {
  const encodedId = btoa(string).slice(0, 22);
  return encodedId;
};

const createUrl = (endpoint) => {
  return `${API_URL}/${endpoint}`;
};

const createAlbumResponse = (album) => {
  return {
    // id: album.id,
    // artist_id: album.artistId,
    name: album.name,
    genre: album.genre,
    artist: createUrl(`artists/${album.artistId}/albums`),
    tracks: createUrl(`albums/${album.id}/tracks`),
    self: createUrl(`albums/${album.id}`),
  };
};

const createTrackResponse = (track, artistId) => {
  return {
    // id: track.id,
    // album_id: track.albumId,
    name: track.name,
    duration: track.duration,
    times_played: track.timesPlayed,
    artist: createUrl(`artists/${artistId}`),
    album: createUrl(`albums/${track.albumId}`),
    self: createUrl(`tracks/${track.id}`),
  };
};

const createArtistResponse = (artist) => {
  return {
    // id: artist.id,
    name: artist.name,
    age: artist.age,
    albums: createUrl(`artists/${artist.id}/albums`),
    tracks: createUrl(`artists/${artist.id}/tracks`),
    self: createUrl(`artists/${artist.id}`),
  };
};

module.exports = {
  createId,
  createArtistResponse,
  createAlbumResponse,
  createTrackResponse,
};

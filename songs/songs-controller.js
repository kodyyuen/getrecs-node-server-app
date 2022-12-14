import * as songsDao from "./songs-dao.js";

const SongsController = (app) => {
  const findTopTenSongs = async (req, res) => {
    const topTen = await songsDao.findTopTenSongs();
    res.json(topTen);
  }

  const createSongs = async (req, res) => {
    const newSongs = req.body;
    await newSongs.forEach(async song => {
      const findSongInDB = await songsDao.findSongById(song.id);
      if (findSongInDB.length === 0) {
        await songsDao.createSong(song)
      } else {
        await songsDao.addToRecCount(song.id)
      }
    });

    res.sendStatus(200);
  }

  app.get('/songs/topTen', findTopTenSongs)
  app.post('/songs/createBatch', createSongs)
}

export default SongsController;
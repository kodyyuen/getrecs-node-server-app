import songsModel from "./songs-model.js";

export const findSongById = async (songID) =>
  await songsModel.find({songID: songID})

export const findTopTenSongs = async () =>
  await songsModel.find().sort({numberOfRecs: -1}).limit(10)

export const createSong = async (songData) =>
  await songsModel.create({
    songID: songData.id,
    title: songData.name,
    artists: songData.artists,
    link: songData.external_urls.spotify,
    numberOfRecs: 1,
  })

export const addToRecCount = async (songID) =>
  await songsModel.findOneAndUpdate({ songID: songID }, {
    $inc : {'numberOfRecs' : 1}
  })
  
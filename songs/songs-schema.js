import mongoose from "mongoose";

const songsSchema = mongoose.Schema({
  songID: String,
  title: String,
  artists: Array,
  link: String,
  numberOfRecs: { type: Number, default: 1 },
}, { collection: "songs" })

export default songsSchema;
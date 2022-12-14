import mongoose from "mongoose";
import songsSchema from "./songs-schema.js";

const songsModel = mongoose.model('SongsModel', songsSchema);

export default songsModel;
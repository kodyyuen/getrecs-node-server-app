import mongoose from "mongoose";

const likesSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    song: {type: String, unique: true}
}, {collection: 'likes'})

export default likesSchema
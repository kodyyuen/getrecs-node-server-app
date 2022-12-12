import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: {type: String, default: ""},
  role: { type: String, enum: ["CONNECTED", "UNCONNECTED"] },
  likes: { type: Array, default: [] },
  recommendations: { type: Array, default: [] },
}, { collection: "users" })

export default usersSchema;
import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, default: "" },
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  likes: { type: Array, default: [] },
  recommendations: { type: Array, default: [] },
  likesData: { type: Array, default: [] }
}, { collection: "users" })

export default usersSchema;
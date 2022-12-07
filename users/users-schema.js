import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    fName: String,
    lName: String,
    role: {type: String, enum: ["CONNECTED", "UNCONNECTED"]}
}, {collection: "users"})

export default usersSchema;
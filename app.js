import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import UsersController from "./users/users-controller.js";
import SongsController from "./songs/songs-controller.js";
import 'dotenv/config';

// mongoose.connect('mongodb://localhost:27017/getrecs')
//mongoose.connect('mongodb://127.0.0.1:27017/getrecs')
mongoose.connect(`mongodb+srv://kody:${process.env.MONGODB_PASSWORD}@cluster0.nth6ltf.mongodb.net/getrecs`);

const app = express();

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}))
app.use(session({
  secret: 'should be an environment variable',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(express.json())

UsersController(app)
SongsController(app)

app.listen(4000)
import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import UsersController from "./users/users-controller.js";
import SongsController from "./songs/songs-controller.js";
import SpotifyController from "./spotify/spotify-controller.js";
import "dotenv/config";
import ConnectMongoDBSession from "connect-mongodb-session";

const MongoDBStore = ConnectMongoDBSession(session);
var store = new MongoDBStore({
  uri: process.env.DB_CONNECTION_STRING,
  collection: "sessions",
});

// Catch errors
store.on("error", function (error) {
  console.log(error);
});

mongoose.connect(`${process.env.DB_CONNECTION_STRING}`);

const app = express();

app.set("trust proxy", 1);
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://getrecs.netlify.app",
    ],
  }),
  session({
    secret: "thesecret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      sameSite: "none",
      secure: true,
    },
    store: store,
    autoRemove: "native",
  }),
  express.json()
);

UsersController(app);
SongsController(app);
SpotifyController(app);

app.listen(process.env.PORT || 4000);

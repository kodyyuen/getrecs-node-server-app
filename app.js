import express from "express";
import cors from "cors";
// import session from "cookie-session";
import session from "express-session";
import mongoose from "mongoose";
import UsersController from "./users/users-controller.js";
import SongsController from "./songs/songs-controller.js";
import SpotifyController from "./spotify/spotify-controller.js";
import "dotenv/config";
import createMemoryStore from "memorystore";
const MemoryStore = createMemoryStore(session);
// const session = require("express-session");
// const MemoryStore = require("memorystore")(session);

mongoose.connect(`${process.env.DB_CONNECTION_STRING}`);

const app = express();

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://dev--celebrated-begonia-8703fb.netlify.app",
    ],
  })
);
app.use(
  session({
    secret: "should be an environment variable",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 },
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
  })
);
app.use(express.json());

UsersController(app);
SongsController(app);
SpotifyController(app);

app.listen(process.env.PORT || 4000);

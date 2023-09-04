import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";
import UsersController from "./users/users-controller.js";
import SongsController from "./songs/songs-controller.js";
import SpotifyController from "./spotify/spotify-controller.js";
import "dotenv/config";
import createMemoryStore from "memorystore";
const MemoryStore = createMemoryStore(session);
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
// const session = require("express-session");
// const MemoryStore = require("memorystore")(session);

mongoose.connect(`${process.env.DB_CONNECTION_STRING}`);

const app = express();

// app.use(
//   cors({
//     credentials: true,
//     origin: [
//       "http://localhost:3000",
//       "https://dev--celebrated-begonia-8703fb.netlify.app",
//     ],
//   })
// );
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://dev--celebrated-begonia-8703fb.netlify.app",
    ],
  }),
  session({
    secret: "thesecret",
    // resave: false,
    saveUninitialized: false,
    // cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000, sameSite: "none" },
    // store: new MemoryStore({
    //   checkPeriod: 86400000,
    // }),
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      sameSite: "none",
      secure: true,
    },
    store: store,
    autoRemove: 'native'
  }),
  express.json()
);
app.set("trust proxy", 1);
// app.use(express.json());
app.get('/', function(req, res) {
  res.send('Hello ' + JSON.stringify(req.session));
});

UsersController(app);
SongsController(app);
SpotifyController(app);

app.listen(process.env.PORT || 4000);

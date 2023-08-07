import axios from "axios";
import querystring from "querystring";

const SpotifyController = (app) => {
  const redirectLogin = async (req, res) => {
    const authEndpoint = "https://accounts.spotify.com/authorize";
    const clientId = "9534d135519d4b049b481e8bc6862e40";
    // const redirectUri = "http://localhost:3000/profile";
    const redirectUri = "http://localhost:4000/spotify/callback";
    const scopes = [
      "user-top-read",
      "user-read-currently-playing",
      "user-read-playback-state",
    ];
    const str = querystring.stringify({
      response_type: "code",
      client_id: clientId,
      scope:
        "user-top-read user-read-currently-playing user-read-playback-state",
      redirect_uri: redirectUri,
      show_dialog: "true",
    });
    res.redirect("https://accounts.spotify.com/authorize?" + str);
    // res.redirect(
    //   `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    //     "%20"
    //   )}&response_type=token&show_dialog=true`
    // );
  };

  const getApiKey = async (req, res) => {
    let code = req.query.code;
    let state = req.query.state;
    const client_id = "9534d135519d4b049b481e8bc6862e40";
    const client_secret = "958d137cb4e44d4b9eca6ad5333bf62e";
    const redirect_urifront = "http://localhost:3000/profile";
    const redirect_uri = "http://localhost:4000/spotify/callback";

    let authOptions = {
      // url: "https://accounts.spotify.com/api/token",
      // method: "POST",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret, "utf-8").toString(
            "base64"
          ),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      json: true,
    };
    console.log("code: " + code);
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(client_id + ":" + client_secret, "utf-8").toString(
              "base64"
            ),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    req.session.apiKey = response.data.access_token;
    console.log("access token: " + response.data.access_token);
    res.redirect(redirect_urifront);
    // axios.post(authOptions, (error, response, body) => {
    //   console.log(body.access_token);
    //   res.json(body.access_token);
    // });
  };

  const getProfile = async (req, res) => {
    if (req.session.apiKey) {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${req.session.apiKey}` },
      });
      console.log("response.data: " + response.data);
      console.log("response: " + response);
      res.json(response.data);
    } else {
      res.sendStatus(403);
    }
  };

  const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const getShortTopSongs = async (req, res) => {
    if (req.session.apiKey) {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=20&offset=0",
        { headers: { Authorization: `Bearer ${req.session.apiKey}` } }
      );
      console.log("response.data: " + response.data);
      console.log("response: " + response);
      res.json(response.data.items);
    } else {
      res.sendStatus(403);
    }
  };

  const getMediumTopSongs = async (req, res) => {
    if (req.session.apiKey) {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=20&offset=0",
        { headers: { Authorization: `Bearer ${req.session.apiKey}` } }
      );
      console.log("response.data: " + response.data);
      console.log("response: " + response);
      res.json(response.data.items);
    } else {
      res.sendStatus(403);
    }
  };

  const getLongTopSongs = async (req, res) => {
    if (req.session.apiKey) {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=20&offset=0",
        { headers: { Authorization: `Bearer ${req.session.apiKey}` } }
      );
      console.log("response.data: " + response.data);
      console.log("response: " + response);
      res.json(response.data.items);
    } else {
      res.sendStatus(403);
    }
  };

  const getSpotifyRecs = async (req, res) => {
    if (req.session.apiKey) {
      console.log(req.body);
      const formattedSongList = req.body.seeds.join(",");
      const query = {
        seed_artists: "",
        seed_genres: "",
        seed_tracks: formattedSongList,
      };
      console.log(req.body.seeds);
      console.log(formattedSongList);

      //res.json([]);
      const response = await axios.get(
        "https://api.spotify.com/v1/recommendations",
        {
          headers: {
            Authorization: `Bearer ${req.session.apiKey}`,
          },
          params: query,
        }
      );
      res.json(response.data);
    } else {
      res.sendStatus(403);
    }
  };

  app.get("/spotify", redirectLogin);
  app.get("/spotify/callback", getApiKey);
  app.get("/spotify/profile", getProfile);
  app.post("/spotify/logout", logout);
  app.get("/spotify/topsongs/short", getShortTopSongs);
  app.get("/spotify/topsongs/medium", getMediumTopSongs);
  app.get("/spotify/topsongs/long", getLongTopSongs);
  app.post("/spotify/recs", getSpotifyRecs);
};

export default SpotifyController;

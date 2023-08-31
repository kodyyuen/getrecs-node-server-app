import axios from "axios";
import querystring from "querystring";

const SpotifyController = (app) => {
  // const redirect_uri_front = "http://localhost:3000/profile";
  // const redirect_uri = "http://localhost:4000/spotify/callback";
  const redirect_uri_front = "https://dev--celebrated-begonia-8703fb.netlify.app/login";
  const redirect_uri = "https://getrecs-node-server-app-6d8abdb70e6b.herokuapp.com/spotify/callback";

  const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

  const checkAPIKey = async (req, res) => {
    if (!req.session.apiKey) {
      req.session.destroy();
      res.sendStatus(403);
    }
  };

  const refreshAuthToken = async (callback, req, res) => {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        refresh_token: req.session.refresh_token,
        grant_type: "refresh_token",
      },
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET,
              "utf-8"
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    req.session.apiKey = response.data.access_token;
    callback(req, res);
  };

  const redirectLogin = async (req, res) => {
    const scopes = ["user-top-read", "playlist-modify-private"];

    const str = querystring.stringify({
      response_type: "code",
      client_id: process.env.CLIENT_ID,
      scope: scopes.join(" "),
      redirect_uri: redirect_uri,
      show_dialog: "true",
    });

    res.redirect("https://accounts.spotify.com/authorize?" + str);
  };

  const getApiKey = async (req, res) => {
    let code = req.query.code;

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
            Buffer.from(
              process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET,
              "utf-8"
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    req.session.apiKey = response.data.access_token;
    req.session.refresh_token = response.data.refresh_token;
    console.log('api token: ' + req.session.apiKey)
    res.redirect(redirect_uri_front);
  };

  const getProfile = async (req, res) => {
    if (req.session.apiKey) {
      let response;
      try {
        response = await axios.get("https://api.spotify.com/v1/me", {
          headers: { Authorization: `Bearer ${req.session.apiKey}` },
        });
        res.json(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          refreshAuthToken(getProfile, req, res);
        }
      }
    } else {
      res.sendStatus(403);
    }
  };

  const getShortTopArtists = async (req, res) => {
    if (req.session.apiKey) {
      let response;
      try {
        response = await axios.get(
          "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10&offset=0",
          { headers: { Authorization: `Bearer ${req.session.apiKey}` } }
        );
        res.json(response.data.items);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          refreshAuthToken(getShortTopArtists, req, res);
        }
      }
    } else {
      res.sendStatus(403);
    }
  };

  const getMediumTopArtists = async (req, res) => {
    if (req.session.apiKey) {
      let response;
      try {
        response = await axios.get(
          "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=0",
          { headers: { Authorization: `Bearer ${req.session.apiKey}` } }
        );
        res.json(response.data.items);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          refreshAuthToken(getMediumTopArtists, req, res);
        }
      }
    } else {
      res.sendStatus(403);
    }
  };

  const getLongTopArtists = async (req, res) => {
    if (req.session.apiKey) {
      let response;
      try {
        response = await axios.get(
          "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10&offset=0",
          { headers: { Authorization: `Bearer ${req.session.apiKey}` } }
        );
        res.json(response.data.items);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          refreshAuthToken(getLongTopArtists, req, res);
        }
      }
    } else {
      res.sendStatus(403);
    }
  };

  const getShortTopSongs = async (req, res) => {
    if (req.session.apiKey) {
      let response;
      try {
        response = await axios.get(
          "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=20&offset=0",
          { headers: { Authorization: `Bearer ${req.session.apiKey}` } }
        );
        res.json(response.data.items);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          refreshAuthToken(getShortTopSongs, req, res);
        }
      }
    } else {
      res.sendStatus(403);
    }
  };

  const getMediumTopSongs = async (req, res) => {
    if (req.session.apiKey) {
      let response;
      try {
        response = await axios.get(
          "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=20&offset=0",
          { headers: { Authorization: `Bearer ${req.session.apiKey}` } }
        );
        res.json(response.data.items);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          refreshAuthToken(getMediumTopSongs, req, res);
        }
      }
    } else {
      res.sendStatus(403);
    }
  };

  const getLongTopSongs = async (req, res) => {
    if (req.session.apiKey) {
      let response;
      try {
        response = await axios.get(
          "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=20&offset=0",
          { headers: { Authorization: `Bearer ${req.session.apiKey}` } }
        );
        res.json(response.data.items);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          refreshAuthToken(getLongTopSongs, req, res);
        }
      }
    } else {
      res.sendStatus(403);
    }
  };

  const getSpotifyRecs = async (req, res) => {
    if (req.session.apiKey) {
      let response;
      try {
        response = await axios.get(
          "https://api.spotify.com/v1/recommendations",
          {
            headers: {
              Authorization: `Bearer ${req.session.apiKey}`,
            },
            params: { seed_tracks: req.body.seeds.join(",") },
          }
        );
        res.json(response.data.tracks);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          refreshAuthToken(getSpotifyRecs, req, res);
        }
      }
    } else {
      res.sendStatus(403);
    }
  };

  const addRecsToPlaylist = async (req, res) => {
    if (req.session.apiKey) {
      const { user_id, body, uris } = req.body.params;

      let playlist;
      let response;
      try {
        playlist = await axios.post(
          `https://api.spotify.com/v1/users/${user_id}/playlists`,
          body,
          {
            headers: {
              Authorization: `Bearer ${req.session.apiKey}`,
            },
          }
        );

        const { id, external_urls } = playlist.data;
        const { spotify } = external_urls;

        response = await axios.post(
          `https://api.spotify.com/v1/playlists/${id}/tracks`,
          uris,
          {
            headers: {
              Authorization: `Bearer ${req.session.apiKey}`,
            },
          }
        );

        if (response.data.snapshot_id) {
          res.json(spotify);
        } else {
          res.sendStatus(403);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          refreshAuthToken(addRecsToPlaylist, req, res);
        }
      }
    } else {
      res.sendStatus(403);
    }
  };

  app.get("/spotify", redirectLogin);
  app.get("/spotify/callback", getApiKey);
  app.get("/spotify/profile", getProfile);
  app.post("/spotify/logout", logout);
  app.get("/spotify/topartists/short", getShortTopArtists);
  app.get("/spotify/topartists/medium", getMediumTopArtists);
  app.get("/spotify/topartists/long", getLongTopArtists);
  app.get("/spotify/topsongs/short", getShortTopSongs);
  app.get("/spotify/topsongs/medium", getMediumTopSongs);
  app.get("/spotify/topsongs/long", getLongTopSongs);
  app.post("/spotify/recs", getSpotifyRecs);
  app.post("/spotify/recs/playlist", addRecsToPlaylist);
};

export default SpotifyController;

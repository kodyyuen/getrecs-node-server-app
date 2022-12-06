// import express from "express";
// import cors from "cors";
// import session from "express-session";
// import mongoose from "mongoose";

// const app = express();
// app.use(express.json())

/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

import request from 'request'; // "Request" library
import SpotifyWebApi from "spotify-web-api-node";

let client_id = '9534d135519d4b049b481e8bc6862e40'; // Your client id
let client_secret = '958d137cb4e44d4b9eca6ad5333bf62e'; // Your secret

// Create the api object with the credentials
let spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: 'http://localhost/8888'
  });
  
  // Retrieve an access token.
  spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
  
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
  );

// app.listen(4000)
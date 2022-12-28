import axios from "axios";
import qs from "qs";
import { getAuthGoogleData, getAuthSpotifyData } from "./data";
import ytCredentials from "../assets/credentials/youtube_api_credentials.json";
import { makeString } from "./functions";

export const GG_REDIRECT_URI = process.env.GG_REDIRECT_URI ?? "http://localhost:3000/?ggCallback";
export const SP_REDIRECT_URI = process.env.SP_REDIRECT_URI ?? "http://localhost:3000/?spCallback";
export const CLIENT_ID = "8292030a3e2a41a0bab006e564f27489";
const CLIENT_SECRET = "f45ba53466bd4850bfb6589e87d73c6a";
const SPOTIFY_ACCOUNTS_URL = "https://accounts.spotify.com";
const SPOTIFY_API_URL = "https://api.spotify.com/v1";
const GOOGLE_ACCOUNTS_URL = ytCredentials.web.auth_uri+"?";
const GOOGLE_API_URL = "https://www.googleapis.com/youtube/v3/";

export const requestSpotifyLogin = (code, redirect_uri) => {
  const headers = {
    Authorization: "Basic " + window.btoa(CLIENT_ID + ":" + CLIENT_SECRET),
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const data = qs.stringify({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirect_uri,
  });

  return axios({
    baseURL: SPOTIFY_ACCOUNTS_URL,
    url: "/api/token",
    method: "POST",
    headers,
    data,
  });
};

export const requestToSpotify = (config) => {
  const headers = {
    Authorization: "Bearer " + getAuthSpotifyData().access_token,
  };

  return axios({...config, baseURL: SPOTIFY_API_URL, headers});
};

export const requestToYoutube = (config) => {
  const headers = {
    Authorization: "Bearer " + getAuthGoogleData().access_token,
  };

  return axios({...config, baseURL: GOOGLE_API_URL, headers})
}

export const redirectionSpotifyUrl = () => {
  var state = makeString(16);
  var scope = "user-read-private user-read-email";

  var aux = qs.stringify({
    state: state,
    scope: scope,
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: SP_REDIRECT_URI,
  });

  return "https://accounts.spotify.com/authorize?" + aux;
};

export const redirectionGoogleUrl = () => {
  var aux = qs.stringify({
    client_id: ytCredentials.web.client_id,
    response_type: 'token',
    redirect_uri: GG_REDIRECT_URI,
    scope: "https://www.googleapis.com/auth/youtube.force-ssl",
    include_granted_scopes: true,
    state: "pass-through value"
  });

  return GOOGLE_ACCOUNTS_URL + aux;
}

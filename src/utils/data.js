export const saveAuthSpotifyData = (obj) => {
  localStorage.setItem("spotifyData", JSON.stringify(obj));
  localStorage.setItem("spotifyExp", JSON.stringify(Date.now() + (3600*1000)));
};

export const getAuthSpotifyData = () => {
  const aux = localStorage.getItem("spotifyData") ?? "{}";
  return JSON.parse(aux);
};

export const saveAuthGoogleData = (obj) => {
  localStorage.setItem("googleData", JSON.stringify(obj));
  localStorage.setItem("googleExp", JSON.stringify(Date.now() + (3600*1000)));
};

export const getAuthGoogleData = () => {
  const aux = localStorage.getItem("googleData") ?? "{}";
  return JSON.parse(aux);
};

export const isSpotifyAuthenticated = () => {
  const exp = localStorage.getItem("spotifyExp");
  return exp > Date.now() ? true : false;
}

export const isGoogleAuthenticated = () => {
  const exp = localStorage.getItem("googleExp");
  return exp > Date.now() ? true : false;
}

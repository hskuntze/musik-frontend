import {
  redirectionGoogleUrl,
  redirectionSpotifyUrl,
  requestSpotifyLogin,
  SP_REDIRECT_URI,
} from "../../utils/requests";
import { useEffect } from "react";
import {
  deleteCachedResponse,
  isGoogleAuthenticated,
  isSpotifyAuthenticated,
  saveAuthGoogleData,
  saveAuthSpotifyData,
} from "../../utils/data";
import { useNavigate } from "react-router-dom";
import { parseGoogleUrl } from "../../utils/functions";
import "./styles.css";

import CheckImg from "../../assets/images/check-lg.svg";

const LoginSection = () => {
  const googleAuth = isGoogleAuthenticated();
  const spotifyAuth = isSpotifyAuthenticated();
  const nav = useNavigate();

  const goToSpotifyLogin = () => {
    window.location.href = redirectionSpotifyUrl();
  };

  const goToGoogleLogin = () => {
    window.location.href = redirectionGoogleUrl();
  };

  useEffect(() => {
    if (googleAuth === false) {
      localStorage.removeItem("googleData");
    }
    if (spotifyAuth === false) {
      localStorage.removeItem("spotifyData");
      deleteCachedResponse("spotifyUserData");
    }

    const url = window.location.href;
    if (url.includes("?spCallback")) {
      let url = new URL(window.location.href);
      let urlParams = new URLSearchParams(url.href);
      let code = urlParams.get("code");
      (async () => {
        const data = (await requestSpotifyLogin(code, SP_REDIRECT_URI)).data;
        saveAuthSpotifyData(data);
        nav("/");
      })();
    }

    if (url.includes("?ggCallback")) {
      let obj = parseGoogleUrl(url);
      saveAuthGoogleData(obj);
      nav("/");
    }
  }, [nav, spotifyAuth, googleAuth]);

  return (
    <div className="section login-section">
      <h4 className="login-section-title">Login at</h4>
      <div className="sub-login-section">
        <div className="overlay-container">
          <button
            id="s-btn-login"
            type="button"
            className="login-button spotify"
            onClick={() => goToSpotifyLogin()}
          >
            Spotify
          </button>
          {spotifyAuth && (
            <div className="overlay">
              <button type="button" className="overlay-button">
                <img src={CheckImg} alt="Check" className="overlay-img" />
              </button>
            </div>
          )}
        </div>
        <div className="overlay-container">
          <button
            id="yt-btn-login"
            type="button"
            className="login-button youtube"
            onClick={() => goToGoogleLogin()}
          >
            YouTube
          </button>
          {googleAuth && (
            <div className="overlay">
              <button type="button" className="overlay-button">
                <img src={CheckImg} alt="Check" className="overlay-img" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSection;

import {
  redirectionGoogleUrl,
  redirectionSpotifyUrl,
  requestSpotifyLogin,
  SP_REDIRECT_URI,
} from "../../utils/requests";
import { useEffect } from "react";
import {
  isGoogleAuthenticated,
  isSpotifyAuthenticated,
  saveAuthGoogleData,
  saveAuthSpotifyData,
} from "../../utils/data";
import { Link, useNavigate } from "react-router-dom";
import { parseGoogleUrl } from "../../utils/functions";
import "./styles.css";

import FirstImg from "../../assets/images/Listening.svg";
import SpotifyLogo from "../../assets/images/spotify-logo.svg";
import YoutubeLogo from "../../assets/images/youtube-logo.svg";
import CheckImg from "../../assets/images/check-lg.svg";

const Home = () => {
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

    if (googleAuth === false) {
      localStorage.removeItem("googleData");
    }
    if (spotifyAuth === false) {
      localStorage.removeItem("spotifyData");
    }
  }, [nav, spotifyAuth, googleAuth]);

  return (
    <div className="home-container">
      <div className="section home-section">
        <img src={FirstImg} alt="Escutando música" className="home-img" />
        <span className="home-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste,
          doloremque temporibus? Eligendi maiores, distinctio ipsa
          necessitatibus recusandae cupiditate itaque explicabo architecto
          dolore nesciunt vel quia quisquam doloremque nihil placeat facere.
        </span>
      </div>
      <div className="section home-section">
        <span className="home-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste,
          doloremque temporibus? Eligendi maiores, distinctio ipsa
          necessitatibus recusandae cupiditate itaque explicabo architecto
          dolore nesciunt vel quia quisquam doloremque nihil placeat facere.
        </span>
        <img src={SpotifyLogo} alt="Logotipo do Youtube" className="home-img" />
      </div>
      <div className="section home-section">
        <img src={YoutubeLogo} alt="Escutando música" className="home-img" />
        <span className="home-text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste,
          doloremque temporibus? Eligendi maiores, distinctio ipsa
          necessitatibus recusandae cupiditate itaque explicabo architecto
          dolore nesciunt vel quia quisquam doloremque nihil placeat facere.
        </span>
      </div>
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
        {googleAuth && spotifyAuth && (
          <Link to="/dash">
            <button
              id="travel-to-dash"
              type="button"
              className="btn btn-secondary"
            >
              Dashboard
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;

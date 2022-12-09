import { Link } from "react-router-dom";
import SpotifyLogo from "../../assets/images/spotify-logo-2.svg";
import YoutubeLogo from "../../assets/images/youtube-logo-2.svg";
import "./styles.css";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <Link to="/dash/spotify">
        <div className="sidebar-section">
          <div className="sidebar-link">
            <img
              src={SpotifyLogo}
              alt="spotify logo"
              className="sidebar-sp-img"
            />
            <span className="spotify-logo-text">Spotify</span>
          </div>
        </div>
      </Link>
      <Link to="/dash/youtube">
        <div className="sidebar-section">
          <div className="sidebar-link">
            <img
              src={YoutubeLogo}
              alt="youtube logo"
              className="sidebar-yt-img"
            />
            <span className="youtube-logo-text">YouTube</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;

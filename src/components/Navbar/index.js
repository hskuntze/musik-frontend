import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import MusikLogo from "../../assets/images/musik-logo.svg";
import {
  isGoogleAuthenticated,
  isSpotifyAuthenticated,
} from "../../utils/data";
import "./styles.css";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);

  const verifyAuth = useCallback(() => {
    let spotify = isSpotifyAuthenticated();
    let yt = isGoogleAuthenticated();

    if (spotify === true && yt === true) {
      setIsAuth(true);
    }
  }, []);

  useEffect(() => {
    if(isAuth === false){
      verifyAuth();
    }
  }, [isAuth, verifyAuth]);

  return (
    <nav className="nav-menu bg-primary">
      <NavLink to="/">
        <img src={MusikLogo} alt="Logo" className="nav-logo" />
        <span className="nav-title">Musik</span>
      </NavLink>
      {isAuth && (
        <NavLink to="/dash">
          <span className="link">Dashboard</span>
        </NavLink>
      )}
    </nav>
  );
};

export default Navbar;

import { NavLink } from "react-router-dom";
import MusikLogo from "../../assets/images/musik-logo.svg";
import "./styles.css";

const Navbar = () => {
  return (
    <nav className="nav-menu bg-primary">
      <NavLink to="/">
        <img src={MusikLogo} alt="Logo" className="nav-logo" />
        <span className="nav-title">Musik</span>
      </NavLink>
      <NavLink to="/dash">
        <span className="link">Dashboard</span>
      </NavLink>
    </nav>
  );
};

export default Navbar;

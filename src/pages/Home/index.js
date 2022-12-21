import "./styles.css";

import FirstImg from "../../assets/images/Listening.svg";
import SpotifyLogo from "../../assets/images/spotify-logo.svg";
import YoutubeLogo from "../../assets/images/youtube-logo.svg";
import LoginSection from "../../components/LoginSection";

const Home = () => {
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
      <LoginSection />
    </div>
  );
};

export default Home;

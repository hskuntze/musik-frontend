import "./styles.css";
import FirstImg from "../../../assets/images/Listening.svg";

const DashHome = () => {
  return (
    <div className="dash-home-content">
      <div className="first-d-section">
        <img src={FirstImg} alt="Escutando música" />
        <span>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste,
          doloremque temporibus? Eligendi maiores, distinctio ipsa
          necessitatibus recusandae cupiditate itaque explicabo architecto
          dolore nesciunt vel quia quisquam doloremque nihil placeat facere.
        </span>
      </div>
    </div>
  );
};

export default DashHome;

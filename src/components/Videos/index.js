import "./styles.css";

const Videos = ({ video }) => {
  return (
    <div className="track-container track-common">
      <div className="track-content track-common">
        <span>{video.snippet.title}</span>
      </div>
    </div>
  );
};

export default Videos;

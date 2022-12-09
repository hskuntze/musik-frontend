import "./styles.css";

const Tracks = ({ track }) => {
  const readArtists = () => {
    let aux = track.track.artists;
    let artists = "";
    for (let i = 0; i < aux.length; i++) {
      if (i === aux.length - 1) {
        artists += aux[i].name;
      } else {
        artists += aux[i].name + ", ";
      }
    }
    return artists;
  };

  return (
    <div className="track-container track-common">
      <div className="track-content track-common">
        <span>
          {track.track.name} <span className="text-muted">by</span>{" "}
          {readArtists()}
        </span>
        {track.track.preview_url !== null && (
          <audio controls className="audio-preview">
            <source src={track.track.preview_url} type="audio/mpeg" />
          </audio>
        )}
      </div>
    </div>
  );
};

export default Tracks;

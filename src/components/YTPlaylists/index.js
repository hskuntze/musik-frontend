import { useEffect } from "react";
import { useState } from "react";
import { requestToYoutube } from "../../utils/requests";
import Videos from "../Videos";
import "./styles.css";

const YTPlaylists = ({ playlist }) => {
  const [show, setShow] = useState(false);
  const [videos, setVideos] = useState();

  const handlePlaylistToggle = () => {
    setShow(show === true ? false : true);
  };

  useEffect(() => {
    const controller = new AbortController();
    if (videos === undefined) {
      (async () => {
        let id = playlist.id;
        const config = {
          url: "/playlistItems",
          method: "GET",
          signal: controller.signal,
          params: {
            part: "snippet",
            playlistId: id,
            maxResults: 100,
          },
        };

        const data = (await requestToYoutube(config)).data;
        setVideos(data);
      })();
    }
  }, [playlist, videos]);

  return (
    <div className="playlists-container">
      <div className="playlist-header">
        <button
          type="button"
          className="playlist-title-button"
          onClick={() => handlePlaylistToggle()}
        >
          {playlist.snippet.title}
        </button>
        {/* <label className="check-container">
          <input
            type="checkbox"
            name={playlist.name}
            id={playlist.id}
            //onClick={() => handler(playlist.id)}
          />
          <span className="check"></span>
        </label> */}
      </div>
      {show && playlist && (
        <>
          {videos.items.map((item) => (
            <Videos key={item.id} video={item} />
          ))}
        </>
      )}
    </div>
  );
};

export default YTPlaylists;

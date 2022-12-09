import { useCallback, useEffect, useState } from "react";
import { requestToSpotify } from "../../utils/requests";
import Pagination from "../Pagination";
import Tracks from "../Tracks";
import "./styles.css";

const Playlists = ({ playlist }) => {
  const [activePage, setActivePage] = useState(0);
  const [show, setShow] = useState(false);
  const [tracks, setTracks] = useState({});
  const totalPages = Math.ceil(tracks.total / tracks.limit);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const requestTracks = useCallback(
    (playlist) => {
      const controller = new AbortController();
      const href = playlist.tracks.href;
      (async () => {
        const config = {
          url: `${href}`,
          method: "GET",
          signal: controller.signal,
          params: {
            offset: activePage * 8,
            limit: 8,
          },
        };

        const data = (await requestToSpotify(config)).data;
        setTracks(data);
      })();
    },
    [activePage]
  );

  useEffect(() => {
    requestTracks(playlist);
  }, [requestTracks, playlist]);

  const handlePlaylistToggle = () => {
    setShow(show === true ? false : true);
  };

  return (
    <div className="playlists-container">
      <button type="button" onClick={() => handlePlaylistToggle(playlist)}>
        {playlist.name}
      </button>
      {show && playlist && (
        <>
          {tracks.items !== undefined &&
            tracks.items.map((item) => (
              <Tracks key={item.track.id} track={item} />
            ))}
          <Pagination
            pageCount={totalPages}
            range={4}
            onChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Playlists;

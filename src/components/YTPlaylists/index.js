import { useEffect } from "react";
import { useState } from "react";
import { requestToYoutube } from "../../utils/requests";
import Pagination from "../Pagination";
import Videos from "../Videos";
import "./styles.css";

const YTPlaylists = ({ playlist }) => {
  const [show, setShow] = useState(false);
  const [videos, setVideos] = useState();
  const [activePage, setActivePage] = useState(0);
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();

  const totalPages =
    videos === undefined
      ? 0
      : Math.ceil(
          videos.pageInfo.totalResults / videos.pageInfo.resultsPerPage
        );

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
            maxResults: 50,
          },
        };

        const data = (await requestToYoutube(config)).data;
        setVideos(data);
      })();
    }

    if(nextPage !== undefined){
      (async () => {
        let id = playlist.id;
        const config = {
          url: "/playlistItems",
          method: "GET",
          signal: controller.signal,
          params: {
            part: "snippet",
            playlistId: id,
            maxResults: 50,
            pageToken: nextPage,
          },
        };

        const data = (await requestToYoutube(config)).data;
        setVideos(data);
        setNextPage(undefined);
      })();
    }

    if(prevPage !== undefined){
      (async () => {
        let id = playlist.id;
        const config = {
          url: "/playlistItems",
          method: "GET",
          signal: controller.signal,
          params: {
            part: "snippet",
            playlistId: id,
            maxResults: 50,
            pageToken: prevPage,
          },
        };

        const data = (await requestToYoutube(config)).data;
        setVideos(data);
        setPrevPage(undefined);
      })();
    }
  }, [playlist, videos, nextPage, prevPage]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    if(pageNumber > activePage){
      setNextPage(videos.nextPageToken);
    }
    if(pageNumber < activePage){
      setPrevPage(videos.prevPageToken);
    }
  };

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
          <Pagination
            pageCount={totalPages}
            range={3}
            onChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default YTPlaylists;

import { useEffect, useState } from "react";
import { requestToSpotify } from "../../../utils/requests";
import Playlists from "../../../components/Playlists";
import Pagination from "../../../components/Pagination";
import "./styles.css";

const Spotify = () => {
  const [user, setUser] = useState();
  const [playlists, setPlaylists] = useState();
  const [changePage, setChangePage] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const totalPages =
    playlists === undefined ? 0 : Math.ceil(playlists.total / playlists.limit);
  const [checkedPlaylists, setCheckedPlaylists] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    if (user === undefined) {
      (async () => {
        const config = {
          url: "/me",
          method: "GET",
          signal: controller.signal,
        };

        const data = (await requestToSpotify(config)).data;
        setUser(data);
      })();
    }

    if (user !== undefined && playlists === undefined) {
      (async () => {
        const config = {
          url: `/users/${user.id}/playlists`,
          method: "GET",
          signal: controller.signal,
          params: {
            limit: 10,
            offset: 0,
          },
        };

        const data = (await requestToSpotify(config)).data;
        setPlaylists(data);
      })();
    }

    if (changePage) {
      (async () => {
        const config = {
          url: `/users/${user.id}/playlists`,
          method: "GET",
          signal: controller.signal,
          params: {
            limit: 10,
            offset: activePage * 10,
          },
        };

        const data = (await requestToSpotify(config)).data;
        setPlaylists(data);
        setChangePage(false);
      })();
    }
  }, [user, playlists, activePage, changePage, checkedPlaylists]);

  const handlePlaylistCheck = (id) => {
    setCheckedPlaylists([...checkedPlaylists, id]);
    if(checkedPlaylists.includes(id)){
      setCheckedPlaylists(checkedPlaylists.filter(pl => pl !== id));
    }
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    setChangePage(true);
  };

  const handleTransfer = () => {
    console.log(checkedPlaylists);
  };

  return (
    <div className="spotify-content">
      {user !== undefined ? (
        <>
          <button
            type="button"
            className="btn btn-primary my-2"
            onClick={handleTransfer}
          >
            Transferir
          </button>
          {playlists !== undefined &&
            playlists.items.map((item) => (
              <Playlists
                key={item.id}
                playlist={item}
                handler={handlePlaylistCheck}
              />
            ))}
          <Pagination
            pageCount={totalPages}
            range={3}
            onChange={handlePageChange}
          />
        </>
      ) : (
        <div className="d-flex justify-content-center flex-column align-items-center mt-3">
          <span>
            É preciso efetuar login nas plataformas para utilizar este recurso.
          </span>
        </div>
      )}
    </div>
  );
};

export default Spotify;

import { useEffect, useState } from "react";
import { requestToSpotify } from "../../../utils/requests";
import Playlists from "../../../components/Playlists";
import "./styles.css";

const Spotify = () => {
  const [user, setUser] = useState();
  const [playlists, setPlaylists] = useState();

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
        console.log(data);
        setPlaylists(data);
      })();
    }
  }, [user, playlists]);

  return (
    <div className="spotify-content">
      {user !== undefined ? (
        <>
          {playlists !== undefined &&
            playlists.items.map((item) => (
              <Playlists key={item.id} playlist={item} />
            ))}
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

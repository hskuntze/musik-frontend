import { useEffect, useState } from "react";
import { requestToSpotify, requestToYoutube } from "../../../utils/requests";
import Playlists from "../../../components/Playlists";
import Pagination from "../../../components/Pagination";
import { toast } from "react-toastify";
import { Circles } from "react-loader-spinner";
import { cacheResponse, getCachedResponse } from "../../../utils/data";
import "./styles.css";

const Spotify = () => {
  const [user, setUser] = useState(getCachedResponse("spotifyUserData"));
  const [playlists, setPlaylists] = useState();
  const [changePage, setChangePage] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [checkedPlaylists, setCheckedPlaylists] = useState([]);
  const [ytPlaylists, setYtPlaylists] = useState();
  const [tracksToTransfer, setTracksToTransfer] = useState([]);
  const [playlistToTransfer, setPlaylistToTransfer] = useState();
  const [trasnferDone, setTransferDone] = useState(false);
  const [transfering, setTransfering] = useState(false);
  const totalPages = playlists === undefined ? 0 : Math.ceil(playlists.total / playlists.limit);
  var ytVideos = [];
  var counter = 0;
  //var timeLeft = 0;

  useEffect(() => {
    const controller = new AbortController();
    if (user === null) {
      (async () => {
        const config = {
          url: "/me",
          method: "GET",
          signal: controller.signal,
        };

        const data = (await requestToSpotify(config)).data;
        setUser(data);
        cacheResponse("spotifyUserData", data);
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
  }, [user, playlists, activePage, changePage]);

  const handlePlaylistCheck = (id) => {
    setCheckedPlaylists([...checkedPlaylists, id]);
    if (checkedPlaylists.includes(id)) {
      setCheckedPlaylists(checkedPlaylists.filter((pl) => pl !== id));
    }
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    setChangePage(true);
  };

  const handleTransfer = () => {
    const controller = new AbortController();

    const config = {
      url: "/playlists",
      method: "GET",
      signal: controller.signal,
      params: {
        part: "id,snippet",
        mine: true,
        maxResults: 50,
      },
    };

    requestToYoutube(config)
      .then((res) => {
        setYtPlaylists(res.data);
      })
      .catch((err) => {
        toast.error(err);
      });

    checkedPlaylists.forEach((item) => {
      const config = {
        url: `/playlists/${item}/tracks`,
        method: "GET",
        signal: controller.signal,
      };

      requestToSpotify(config)
        .then((res) => {
          res.data.items.forEach((item) => {
            if (!tracksToTransfer.some((e) => e.track === item.track.name)) {
              setTracksToTransfer([
                ...tracksToTransfer,
                tracksToTransfer.push({
                  track: item.track.name,
                  artists: item.track.artists,
                }),
              ]);
            }
          });
        })
        .catch((err) => {
          toast.error(err);
        });
    });
  };

  const readArtists = (obj) => {
    let aux = obj.artists;
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

  const handleSelectPlaylist = (id) => {
    if (playlistToTransfer === undefined) setPlaylistToTransfer(id);
  };

  // const updateTimeLeft = () => {
  //   setInterval(() => {
  //     timeLeft -= 1;
  //   }, 1000);
  // }

  const addVideo = (video) => {
    const config = {
      url: "playlistItems",
      method: "POST",
      params: {
        part: "snippet",
      },
      data: {
        snippet: {
          playlistId: String(playlistToTransfer),
          resourceId: {
            kind: "youtube#video",
            videoId: video,
          },
        },
      },
    };

    requestToYoutube(config);
  };

  const insertLoop = (video) => {
    setTransfering(true);
    addVideo(video);
    setTimeout(() => {
      counter++;
      if (counter < ytVideos.length) {
        insertLoop(ytVideos[counter]);
      } else {
        setTransfering(false);
        setTransferDone(true);
      }
    }, 3000);
  };

  const handleTransferSubmit = () => {
    for (const obj of tracksToTransfer) {
      if (obj.track !== undefined) {
        let query = obj.track + " " + readArtists(obj);

        let config = {
          url: "/search",
          method: "GET",
          params: {
            part: "id,snippet",
            channelType: "any",
            order: "title",
            type: "video",
            q: query,
          },
        };

        requestToYoutube(config)
          .then((res) => {
            let id = res.data.items[0].id.videoId;
            ytVideos.push(id);
          })
          .catch((err) => {
            toast.error(err);
          });
      }
    }
    insertLoop(ytVideos[0]);
  };

  return (
    <div className="spotify-content">
      {user !== undefined ? (
        <>
          <button
            type="button"
            className="btn btn-primary my-2"
            data-bs-toggle="modal"
            data-bs-target="#transferModal"
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
          <div
            className="modal fade"
            id="transferModal"
            tabIndex="-1"
            aria-labelledby="transferModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-fullscreen">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title" id="transferModalLabel">
                    Transferir músicas
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                {transfering ? (
                  <div className="d-flex flex-column justify-content-center align-items-center my-auto">
                    <Circles
                      height="80"
                      width="80"
                      color="#62e65f"
                      ariaLabel="circles-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  </div>
                ) : (
                  <>
                    {trasnferDone ? (
                      <div className="d-flex justify-content-center align-items-center my-auto">
                        Sucesso!
                      </div>
                    ) : (
                      <div className="modal-body">
                        {ytPlaylists !== undefined &&
                          ytPlaylists.items.map((item) => (
                            <div className="playlists-container" key={item.id}>
                              <div className="playlist-header">
                                <div className="playlist-title-button">
                                  {item.snippet.title}
                                </div>
                                <label className="check-container">
                                  <input
                                    type="checkbox"
                                    name={item.snippet.name}
                                    id={item.id}
                                    onClick={() =>
                                      handleSelectPlaylist(item.id)
                                    }
                                  />
                                  <span className="check"></span>
                                </label>
                              </div>
                            </div>
                          ))}
                        <span className="modal-warning">
                          Selecione 1 playlist
                        </span>
                      </div>
                    )}

                    <div className="modal-footer">
                      {trasnferDone ? (
                        <button
                          type="button"
                          className="btn btn-success"
                          data-bs-dismiss="modal"
                        >
                          <i className="bi bi-check-lg" />
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Cancelar
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleTransferSubmit()}
                          >
                            Transferir
                          </button>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
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

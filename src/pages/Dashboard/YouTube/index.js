import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import YTPlaylists from "../../../components/YTPlaylists";
import { requestToYoutube } from "../../../utils/requests";
import "./styles.css";

const YouTube = () => {
  const [playlists, setPlaylists] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const controller = new AbortController();
    if (playlists === undefined) {
      (async () => {
        const config = {
          url: "/playlists",
          method: "GET",
          signal: controller.signal,
          params: {
            part: "snippet,id",
            mine: true,
            maxResults: 5,
          },
        };

        try {
          const data = (await requestToYoutube(config)).data;
          if (data.pageInfo.totalResults > data.pageInfo.resultsPerPage) {
            let total = data.pageInfo.totalResults;

            config.params.maxResults = total + 1;
            const newData = (await requestToYoutube(config)).data;
            setPlaylists(newData);
          } else {
            setPlaylists(data);
          }
        } catch (error) {
          toast.error(
            "error: " + error.name + ", status: " + error.response.status + "."
          );
          setError(error.response.data.error.message);
        }
      })();
    }
  }, [playlists]);

  return (
    <>
      {playlists !== undefined ? (
        <div className="youtube-content">
          {playlists.items.map((item) => (
            <YTPlaylists key={item.id} playlist={item} />
          ))}
        </div>
      ) : (
        <div className="youtube-content">
          {error !== undefined && (
            <>
              <span>Erro ao carregar os dados.</span>
              <p className="text-center mt-4">{error}</p>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default YouTube;

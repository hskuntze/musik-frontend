import { useState } from "react";
import { useEffect } from "react";
import YTPlaylists from "../../../components/YTPlaylists";
import { requestToYoutube } from "../../../utils/requests";
import "./styles.css";

const YouTube = () => {
  const [playlists, setPlaylists] = useState();

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

        const data = (await requestToYoutube(config)).data;

        if (data.pageInfo.totalResults > data.pageInfo.resultsPerPage) {
          let total = data.pageInfo.totalResults;

          config.params.maxResults = total + 1;
          const newData = (await requestToYoutube(config)).data;
          setPlaylists(newData);
        } else {
          setPlaylists(data);
        }
      })();
    }
  }, [playlists]);

  return (
    <div className="youtube-content">
      {playlists !== undefined &&
        playlists.items.map((item) => (
          <>
            <YTPlaylists key={item.id} playlist={item} />
          </>
        ))}
    </div>
  );
};

export default YouTube;

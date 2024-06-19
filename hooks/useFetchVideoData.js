import { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const useFetchVideoData = (id) => {
  const [finalURL, setFinalURL] = useState(null);
  const [error, setError] = useState(null);
  const [Subtitle, setSubtitle] = useState([]);
  const [Streams, setStreams] = useState([]);
  const {
    data: playerData,
    isLoading: playerLoading,
    error: playerError,
  } = useQuery({
    queryKey: ["player", id],
    queryFn: async () => {
      const response = await axios.get(
        `https://videosrc.vercel.app/vidsrc/${id}`
      );
      return response.data;
    },
    onError: (err) => setError(err.message),
  });

  const parseM3U8 = (content, baseUrl) => {
    const lines = content.split("\n");
    const streams = [];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("#EXT-X-STREAM-INF")) {
        const bandwidthMatch = lines[i].match(/BANDWIDTH=(\d+)/);
        const resolutionMatch = lines[i].match(/RESOLUTION=(\d+x\d+)/);
        const url = baseUrl + lines[i + 1];
        if (bandwidthMatch && resolutionMatch && url) {
          streams.push({
            bandwidth: parseInt(bandwidthMatch[1], 10),
            resolution: resolutionMatch[1],
            url,
          });
        }
      }
    }

    return streams;
  };


  useEffect(() => {
    if (playerData && Object.keys(playerData.sources).length !== 0) {
      const vidplayStreamObject = playerData.sources.find(
        (stream) => stream?.name === "Vidplay"
      );
      setSubtitle(vidplayStreamObject?.data?.subtitle);
      const vidplayStream = vidplayStreamObject?.data?.stream;

      if (vidplayStream) {
        fetchStreamData(vidplayStream);
      }
    } else if (playerData) {
      setError("No sources available");
    }
  }, [playerData]);

  const fetchStreamData = async (vidplayStream) => {
    try {
      const baseUrl = vidplayStream.split("list")[0];
      const { data: streamURLS } = await axios.get(vidplayStream);
      const parsedStream = parseM3U8(streamURLS, baseUrl);
        setStreams(parsedStream);
      const firstParsedUrl = parsedStream[1]?.url;
      if (firstParsedUrl) {
        setFinalURL(firstParsedUrl);
      } else {
        setError("No parsed URL found");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching stream data:", error);
    }
  };

  return { finalURL, error, isLoading: playerLoading || !!playerError, Streams, Subtitle };
};

export default useFetchVideoData;

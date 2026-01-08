import { useState, useEffect } from "react";
import { parseYouTubeUrl, isValidYouTubeVideoId } from "@/lib/youtube";

interface UseYouTubeVideoIdReturn {
  videoId: string;
  error: boolean;
  isValidVideoId: boolean;
}

export const useYouTubeVideoId = (url: string): UseYouTubeVideoIdReturn => {
  const [videoId, setVideoId] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const extractedVideoId = parseYouTubeUrl(url);
    const isValid = extractedVideoId && isValidYouTubeVideoId(extractedVideoId);

    // Only update state if values have actually changed
    if (isValid) {
      if (videoId !== extractedVideoId) {
        setVideoId(extractedVideoId);
      }
      if (error) {
        setError(false);
      }
    } else {
      if (videoId !== "") {
        setVideoId("");
      }
      if (!error) {
        setError(true);
      }
    }
  }, [url, videoId, error]); // Add videoId and error to dependencies

  const isValidVideoId = videoId.length === 11 && !error;

  return {
    videoId,
    error,
    isValidVideoId,
  };
};

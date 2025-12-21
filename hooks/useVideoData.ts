import { useState, useEffect, useRef } from "react";
import { VideoService } from "@/services/videoService";
import type { UseVideoDataReturn, VideoData } from "@/types";

export const useVideoData = (
  videoId: string | string[] | undefined
): UseVideoDataReturn => {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasInitialized = useRef<string | null>(null);

  // Normalize videoId to string
  const normalizedVideoId = Array.isArray(videoId) ? videoId[0] : videoId;

  const fetchVideoData = async (id: string) => {
    if (!id || typeof id !== "string" || id.trim().length !== 11) {
      setError("Video ID is required");
      setLoading(false);
      return;
    }

    if (loading || hasInitialized.current === id) return;

    hasInitialized.current = id;
    setLoading(true);
    setError(null);

    try {
      const data = await VideoService.getVideoDetails(id.trim());
      setVideoData(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch video data";
      setError(errorMessage);
      console.error("Error fetching video details:", err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    if (normalizedVideoId && typeof normalizedVideoId === "string") {
      hasInitialized.current = null; // Reset to allow refetch
      fetchVideoData(normalizedVideoId);
    }
  };

  useEffect(() => {
    // Reset initialization when videoId changes
    if (hasInitialized.current !== normalizedVideoId) {
      hasInitialized.current = null;
    }

    if (!normalizedVideoId || typeof normalizedVideoId !== "string") {
      setError("Video ID is required");
      return;
    }

    if (normalizedVideoId.trim().length !== 11) {
      setError("Invalid video ID format");
      return;
    }

    fetchVideoData(normalizedVideoId);
  }, [normalizedVideoId]);

  return {
    videoData,
    loading,
    error,
    refetch,
  };
};

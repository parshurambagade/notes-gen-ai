import { useState, useEffect, useRef } from "react";
import { NotesService } from "@/services/notesService";
import { NotesData, UseNotesGeneratorProps, VideoData } from "@/types";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import useRecentlyGeneratedNotesStore from "@/stores/recently-generated-notes-store";

export const useNotesGenerator = (
  videoId: string,
  videoData: VideoData | null
): UseNotesGeneratorProps => {
  const [notes, setNotes] = useState<NotesData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isGeneratingRef = useRef(false);

  const { user } = useAuth();
  const router = useRouter();

  // Recently generated notes store
  const {
    getCachedNotes,
    addGeneratedNote,
    hasGeneratedNotes,
    cleanupOldEntries,
  } = useRecentlyGeneratedNotesStore();

  const generateNotes = async (videoId: string) => {
    if (!videoId) {
      setError("Video ID is required to generate notes");
      return;
    }

    // Prevent multiple simultaneous calls
    if (isGeneratingRef.current) {
      return;
    }

    // Check if we have cached notes first
    const cachedNotes = getCachedNotes(videoId);
    if (cachedNotes) {
      setNotes(cachedNotes.notesData);
      setLoading(false);
      return;
    }

    isGeneratingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      // Check if notes already exist in saved notes for this videoId
      if (user) {
        const existingNotes = await NotesService.getNotesByVideoId(
          videoId,
          user.id
        );

        if (existingNotes) {
          setLoading(false);
          router.push(`/notes/${existingNotes.video_id}`);
          return;
        }
      }

      const notesData = await NotesService.generateNotes(videoId);
      setNotes(notesData);

      // Cache the generated notes
      addGeneratedNote(videoId, notesData, videoData);
    } catch (err: any) {
      let errorMessage = "Failed to generate notes. Please try again.";

      // Parse and simplify common error messages
      if (err?.message) {
        const message = err.message.toLowerCase();

        // Check for specific error patterns
        if (
          message.includes("transcript") ||
          message.includes("could not fetch transcript")
        ) {
          errorMessage =
            "Could not get video transcript. Please check if the video has captions enabled.";
        } else if (
          message.includes("video length") ||
          message.includes("too long")
        ) {
          errorMessage =
            "Video is too long to process. Please try with a shorter video.";
        } else if (
          message.includes("network") ||
          message.includes("fetch failed")
        ) {
          errorMessage =
            "Network error. Please check your internet connection and try again.";
        } else if (
          message.includes("api") ||
          message.includes("quota") ||
          message.includes("rate limit")
        ) {
          errorMessage =
            "Service temporarily unavailable. Please try again in a few minutes.";
        } else if (
          message.includes("video not found") ||
          message.includes("invalid video")
        ) {
          errorMessage =
            "Video not found. Please check the YouTube URL and try again.";
        } else if (message.includes("failed to generate notes")) {
          errorMessage =
            "Unable to generate notes for this video. The content might not be suitable for note generation.";
        } else if (message.includes("json") || message.includes("parse")) {
          errorMessage =
            "There was an issue processing the video content. Please try again.";
        } else if (message.includes("timeout")) {
          errorMessage =
            "Request timed out. Please try again with a shorter video.";
        }
      }

      setError(errorMessage);
      console.error("Error fetching notes:", err);
      console.error("Error message:", err?.message);
      console.error("Error type:", typeof err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    if (videoId && videoId.length === 11) {
      await generateNotes(videoId);
    }
  };

  useEffect(() => {
    if (videoId && videoId.length === 11) {
      // Check cache first before generating
      const cachedNotes = getCachedNotes(videoId);
      if (cachedNotes) {
        setNotes(cachedNotes.notesData);
        setLoading(false);
        setError(null);
      } else {
        generateNotes(videoId);
      }
    }
  }, [videoId]);

  // Cleanup old entries periodically
  useEffect(() => {
    cleanupOldEntries();
  }, []);

  return {
    notes,
    loading,
    error,
    generateNotes,
    refetch,
  };
};

"use client";

import { NotesService } from "@/services/notes.service";
import { VideoService } from "@/services/video.service";
import { useGlobalStore } from "@/stores/global-store";
import generateNotesResponse from "@/mocks/generate-notes-response.json";
import { Notes } from "@/types/notes.types";
import { convertMarkdownToJson } from "@/lib/notes";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { VideoData } from "@/types/video.types";
const useGenerateNotes = () => {
  const supabase = createClient();
  const { user } = useAuth();
  const {
    setError,
    setVideoData,
    setNotes,
    notes,
    videoData,
    setIsGenerating,
    setIsFetchingVideoData,
    isGenerating,
    isFetchingVideoData,
  } = useGlobalStore();

  const router = useRouter();

  const generateNotes = async (videoId: string) => {
    if (!videoId) {
      setError("Video ID is not valid. Please enter a valid YouTube URL");
      return;
    }
    try {
      setIsFetchingVideoData(true);
      setIsGenerating(true);
      setError("");

      // check if notes are already saved
      if (user?.id) {
        const { data: savedNotes, error: savedNotesError } = await supabase
          .from("notes")
          .select("*")
          .eq("user_id", user?.id)
          .eq("video_id", videoId);

        if (savedNotesError) {
          setError(savedNotesError.message);
          return;
        }

        if (savedNotes && savedNotes?.length > 0) {
          toast.error(
            "Notes already saved for this video. Redirecting to notes page..."
          );
          setIsGenerating(false);
          setIsFetchingVideoData(false);
          const notes: Notes = {
            summary: JSON.parse(savedNotes[0]?.content)?.summary,
            keyPoints: JSON.parse(savedNotes[0]?.content)?.keyPoints,
            sections: JSON.parse(savedNotes[0]?.content)?.sections,
          };
          setNotes(notes);
          const videoData: VideoData = {
            title: savedNotes[0].video_title,
            videoId: savedNotes[0].video_id,
            duration: savedNotes[0].video_duration,
            channel: savedNotes[0].video_channel,
            thumbnailUrl: savedNotes[0].video_thumbnail_url,
          };
          setVideoData(videoData);
          setTimeout(() => {
            router.push(`/notes/${videoId}`);
          }, 2500);

          return;
        }
      }

      const videoData = await VideoService.getVideoDetails(videoId);
      setVideoData(videoData);
      setIsFetchingVideoData(false);

      const notes = await NotesService.generateNotes(videoId);
      setNotes(notes);
      //  !  USING MOCK DATA TO AVOID API CALLS
      // const notes = generateNotesResponse?.notes;
      // setNotes(convertMarkdownToJson(notes) as Notes);
      setIsFetchingVideoData(false);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Error generating notes. Please try again."
      );
      console.error(error);
    } finally {
      setIsGenerating(false);
      setIsFetchingVideoData(false);
    }
  };

  return {
    notes,
    videoData,
    isGenerating,
    isFetchingVideoData,
    generateNotes,
  };
};

export default useGenerateNotes;

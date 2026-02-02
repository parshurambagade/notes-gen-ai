import { useAuth } from "@/contexts/auth-context";
import { createClient } from "@/lib/supabase/client";
import { useGlobalStore } from "@/stores/global-store";
import { Notes, SavedNote } from "@/types/notes.types";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { toast } from "sonner";

const useNotes = () => {
  const { notes, videoId, videoData } = useGlobalStore();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openReplaceNotesAlert, setOpenReplaceNotesAlert] = useState(false);
  const supabase = createClient();
  const { user } = useAuth();

  const router = useRouter();

  const handleSaveNotes = async (notes: Notes | null) => {
    setIsPending(true);
    try {
      if (!notes) {
        setError("Notes are not valid");
        return;
      }

      // check if notes are already saved
      const { data: savedNotes, error: savedNotesError } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", user?.id)
        .eq("video_id", videoId);

      if (savedNotesError) {
        setError(savedNotesError.message);
        toast.error(savedNotesError.message);
        return;
      }

      if (savedNotes && savedNotes?.length > 0) {
        toast.error("Notes already saved, redirecting to notes page...");
        setIsPending(false);
        setTimeout(() => {
          router.push(`/notes/${videoData?.videoId}`);
        }, 2500);
        return;
      }
      // save notes to database
      const { data: newSavedNotes, error: newSavedNotesError } = await supabase
        .from("notes")
        .insert({
          user_id: user?.id,
          video_id: videoData?.videoId,
          video_title: videoData?.title,
          video_channel: videoData?.channel,
          video_duration: videoData?.duration,
          video_thumbnail_url: videoData?.thumbnailUrl,
          content: notes,
        }).select("*");

      if (newSavedNotesError) {
        setError(newSavedNotesError.message);
        toast.error(newSavedNotesError.message);
        return;
      }

      if (newSavedNotes) {
        toast.success("Notes saved successfully");
        setIsPending(false);
        router.push(`/notes/${videoData?.videoId}`);
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving notes");
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      setIsPending(false);
      return;
    } finally {
      setIsPending(false);
      setError(null);
    }
  };

  const getNotes = useCallback(async (videoId: string): Promise<SavedNote | undefined> => {
    // Don't proceed if user is not available
    if (!user?.id) {
      setError(null);
      setIsPending(false);
      return;
    }

    // Validate videoId
    if (!videoId || typeof videoId !== "string") {
      setError("Invalid video ID");
      setIsPending(false);
      return;
    }

    setIsPending(true);
    setError(null);
    
    try {
      const { data: notes, error: notesError } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", user.id)
        .eq("video_id", videoId);

      if (notesError) {
        setError(notesError.message);
        toast.error(notesError.message);
        setIsPending(false);
        return;
      }

      if (notes && notes?.length > 0) {
        setError(null);
        setIsPending(false);
        return notes[0] as SavedNote;
      }

      // No notes found
      setError(null);
      setIsPending(false);
      return;

    } catch (error) {
      console.error(error);
      toast.error("An error occurred while getting notes");
      setError(error instanceof Error ? error.message : "An unknown error occurred");
      setIsPending(false);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const handleDeleteNotes = async (videoId: string) => {
    setIsPending(true);
    try {
      const { error: notesError } = await supabase
        .from("notes")
        .delete()
        .eq("user_id", user?.id)
        .eq("video_id", videoId)
        .select();

      if (notesError) {
        setError(notesError.message);
        toast.error(notesError.message);
        return;
      }

      toast.success("Notes deleted successfully");
      setIsPending(false);
      setTimeout(() => {
        router.push(`/notes/all`);
      }, 1000);
      return;

    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting notes");
      setError(error instanceof Error ? error.message : "An unknown error occurred");
      setIsPending(false);
      return;
    } finally {
      setIsPending(false);
    }
  };
  return {
    handleSaveNotes,
    isPending,
    error,
    handleDeleteNotes,
    getNotes,
    openReplaceNotesAlert,
    setOpenReplaceNotesAlert,
    notes,
  };
};

export default useNotes;

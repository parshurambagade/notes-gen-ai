import { useAuth } from "@/contexts/auth-context";
import { createClient } from "@/lib/supabase/client";
import { useGlobalStore } from "@/stores/global-store";
import { Notes, SavedNote } from "@/types/notes.types";
import { useState } from "react";
import { toast } from "sonner";

const useNotes = () => {
  const { notes, videoId, videoData } = useGlobalStore();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openReplaceNotesAlert, setOpenReplaceNotesAlert] = useState(false);
  const supabase = createClient();
  const { user } = useAuth();

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
        setOpenReplaceNotesAlert(true);
        return;
      }
      // save notes to database
      const { data: newSavedNotes, error: newSavedNotesError } = await supabase
        .from("notes")
        .insert({
          user_id: user?.id,
          video_id: videoId,
          video_title: videoData?.title,
          video_channel: videoData?.channel,
          video_duration: videoData?.duration,
          video_thumbnail_url: videoData?.thumbnailUrl,
          content: notes,
        });

      if (newSavedNotesError) {
        setError(newSavedNotesError.message);
        toast.error(newSavedNotesError.message);
        return;
      }

      if (newSavedNotes) {
        toast.success("Notes saved successfully");
        setOpenReplaceNotesAlert(false);
        setIsPending(false);
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

  const getNotes = async (videoId: string): Promise<SavedNote | undefined> => {
   setIsPending(true);
   try{
    const { data: notes, error: notesError } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user?.id)
    .eq("video_id", videoId);

    if (notesError) {
      setError(notesError.message);
      toast.error(notesError.message);
      return;
    }

    if (notes && notes?.length > 0) {
      return notes[0] as SavedNote;
    }

   }catch(error){
    console.error(error);
    toast.error("An error occurred while getting notes");
    setError(error instanceof Error ? error.message : "An unknown error occurred");
    setIsPending(false);
    return;
   }finally{
    setIsPending(false);
   }
  };

  return {
    handleSaveNotes,
    isPending,
    error,
    getNotes,
    openReplaceNotesAlert,
    setOpenReplaceNotesAlert,
    notes,
  };
};

export default useNotes;

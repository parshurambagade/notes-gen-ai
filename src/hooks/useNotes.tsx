import { useAuth } from "@/contexts/auth-context";
import { createClient } from "@/lib/supabase/client";
import { useGlobalStore } from "@/stores/global-store";
import { Notes } from "@/types/notes.types";
import React, { useState } from "react";
import { toast } from "sonner";

const useNotes = () => {
  const { notes, videoId, videoData } = useGlobalStore();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openReplaceNotesAlert, setOpenReplaceNotesAlert] = useState(false);
  const supabase = createClient();
  const { user } = useAuth();

  const handleSaveNotes = async (notes: Notes | null) => {
    try {
      // check if notes are valid
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
        setIsSaving(false);
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving notes");
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      setIsSaving(false);
      return;
    } finally {
      setIsSaving(false);
      setError(null);
    }
  };

  const getAllSavedNotes = async () => {
   try{
    const { data: savedNotes, error: savedNotesError } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", user?.id);

    if (savedNotesError) {
      setError(savedNotesError.message);
      toast.error(savedNotesError.message);
      return;
    }

    if (savedNotes && savedNotes?.length > 0) {
      return savedNotes;
    }
   }catch(error){
    console.error(error);
    toast.error("An error occurred while getting all saved notes");
    return;
   }
  };

  return {
    handleSaveNotes,
    isSaving,
    error,
    openReplaceNotesAlert,
    setOpenReplaceNotesAlert,
    notes,
    getAllSavedNotes,
  };
};

export default useNotes;

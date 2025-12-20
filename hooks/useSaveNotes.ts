// hooks/useSaveNotes.ts
import { useState } from "react";
import { NotesService } from "@/services/notesService";
import { useAuth } from "@/contexts/authContext";
import { toast } from "sonner";
import type { VideoData, NotesData } from "@/types";
import useSavedNotesStore from "@/stores/saved-notes-store";

export const useSaveNotes = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth();

  const { saveOneNotes } = useSavedNotesStore();

  const saveNotes = async (videoData: VideoData, notesData: NotesData) => {
    if (!user) {
      toast.error("You must be logged in to save notes.");
      return false;
    }
    if (!videoData || !notesData) {
      toast.error("Missing video data or notes to save.");
      return false;
    }
    setIsSaving(true);

    try {
      const savedNote = await NotesService.saveNotes(videoData, notesData);

      setIsSaved(true);
      toast.success("Notes saved successfully!", {
        description: "You can find your saved notes in your dashboard.",
      });
      saveOneNotes(savedNote);
      return savedNote;
    } catch (error) {
      console.error("Error saving notes:", error);
      toast.error("Failed to save notes", {
        description:
          error instanceof Error ? error.message : "Please try again later.",
      });
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const checkIfSaved = async (videoId: string) => {
    if (!user) return false;

    try {
      const exists = await NotesService.checkIfNotesExists(user.id, videoId);
      setIsSaved(!!exists);
      return exists;
    } catch (error) {
      console.error("Error checking if note exists:", error);
      return false;
    }
  };

  return {
    saveNotes,
    isSaving,
    isSaved,
    setIsSaved,
    checkIfSaved,
  };
};

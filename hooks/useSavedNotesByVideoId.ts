import { useState, useEffect } from "react";
import { NotesService } from "@/services/notesService";
import { useAuth } from "@/contexts/authContext";
import { SavedNote } from "@/types";
import useSavedNotesStore from "@/stores/saved-notes-store";

export const useSavedNotesByVideoId = (videoId: string) => {
  const [savedNotes, setSavedNotes] = useState<SavedNote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();

  const { allSavedNotes } = useSavedNotesStore();

  const fetchSavedNotes = async (videoId: string) => {
    try {
      if (!user && !videoId) {
        setError("Video ID is required to fetch saved notes");
        return;
      }
      setLoading(true);
      setError(null);

      const notes = await NotesService.getNotesByVideoId(
        videoId,
        user?.id as string
      );

      // Check if the note belongs to the current user (if user is logged in)
      if (notes && user && notes.user_id !== user.id) {
        throw new Error("You do not have permission to view this note");
      }

      setSavedNotes(notes);
    } catch (err) {
      console.error("Error fetching saved note:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch saved note"
      );
      setSavedNotes(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Don't fetch if auth is still loading or no videoId
    if (authLoading || !videoId || !user) {
      return;
    }
    const existingNote = allSavedNotes.find(
      (note) => note.video_id === videoId
    );

    if (existingNote) {
      setSavedNotes(existingNote);
      return;
    } else {
      fetchSavedNotes(videoId);
    }
  }, [videoId, authLoading, user?.id, allSavedNotes]);

  const refetch = () => {
    if (videoId) {
      fetchSavedNotes(videoId);
    }
  };

  return {
    savedNotes,
    loading,
    error,
    refetch,
  };
};

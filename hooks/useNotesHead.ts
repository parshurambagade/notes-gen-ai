import React from "react";
import { useSaveNotes } from "./useSaveNotes";
import { useAuth } from "@/contexts/authContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { NotesData, VideoData } from "@/types";

const useNotesHead = (videoData: VideoData | null, notes: NotesData | null) => {
  const { user } = useAuth();
  const { saveNotes, isSaving, isSaved, checkIfSaved } = useSaveNotes();

  const router = useRouter();

  const handleSave = async () => {
    if (!videoData || !notes) {
      toast.error("Cannot save: Missing video data or notes");
      return;
    }

    await saveNotes(videoData, notes);

    router.push(`/notes/all`);
  };

  // Check if notes are already saved when component mounts
  React.useEffect(() => {
    if (user && videoData?.videoId) {
      checkIfSaved(videoData?.videoId as string);
    }
  }, [user, videoData?.videoId, checkIfSaved]);

  return {
    handleSave,
    isSaving,
    isSaved,
    videoData,
    notes,
  };
};

export default useNotesHead;

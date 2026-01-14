import { createClient } from "@/lib/supabase/client";
import { useGlobalStore } from "@/stores/global-store";
import { Notes } from "@/types/notes.types";
import React, { useState } from "react";

const useNotes = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleSaveNotes = async (notes: Notes | null) => {
    try {
     // check if notes are valid

     // check if notes are already saved

     // save notes to database
    } catch (error) {
      console.error(error);
    }
  };
  return {
    handleSaveNotes,
    isSaving,
    error,
  };
};

export default useNotes;

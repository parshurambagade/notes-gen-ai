import { SavedNote } from '@/types/notes.types';
import { useState, useCallback } from 'react'
import { toast } from 'sonner';
import { useAuth } from '@/contexts/auth-context';
import { createClient } from '@/lib/supabase/client';

const useAllNotes = () => {
    const supabase = createClient();
    const [allSavedNotes, setAllSavedNotes] = useState<SavedNote[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);

    const {user} = useAuth();
    
    const getAllSavedNotes = useCallback(async () => {
        // Don't set error if user is not available - let the component handle it
        if(!user?.id) {
            setError(null);
            return;
        }

        try{
            setIsPending(true);
         const { data: savedNotes, error: savedNotesError } = await supabase
           .from("notes")
           .select("*")
           .eq("user_id", user?.id);
     
         if (savedNotesError) {
           setError(savedNotesError.message);
           toast.error(savedNotesError.message);
           setIsPending(false);
           return;
         }
     
         if (savedNotes && savedNotes?.length > 0) {
          setIsPending(false);
          setError(null);
           return savedNotes;
         }
         
         // No notes found, but that's not an error
         setError(null);
         setIsPending(false);
         return [];
        }catch(error){
         console.error(error);
         toast.error("An error occurred while getting all saved notes");
         return;
        }finally{
            setIsPending(false);
        }
       // eslint-disable-next-line react-hooks/exhaustive-deps
       }, [user?.id]);

  return {
    allSavedNotes,
    setAllSavedNotes,
    getAllSavedNotes,
    error,
    isPending,
  }
}

export default useAllNotes
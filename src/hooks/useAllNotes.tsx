import { SavedNote } from '@/types/notes.types';
import { useState } from 'react'
import { toast } from 'sonner';
import { useAuth } from '@/contexts/auth-context';
import { createClient } from '@/lib/supabase/client';

const useAllNotes = () => {
    const supabase = createClient();
    const [allSavedNotes, setAllSavedNotes] = useState<SavedNote[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);

    const {user} = useAuth();
    
    const getAllSavedNotes = async () => {

        if(!user?.id) {
            setError("User not found");
            toast.error("User not found");
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
           return savedNotes;
         }
        }catch(error){
         console.error(error);
         toast.error("An error occurred while getting all saved notes");
         return;
        }finally{
            setIsPending(false);
        }
       };

  return {
    allSavedNotes,
    setAllSavedNotes,
    getAllSavedNotes,
    error,
    isPending,
  }
}

export default useAllNotes
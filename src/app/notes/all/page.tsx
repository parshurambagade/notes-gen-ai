"use client";

import NotesCard from '@/components/notes/notes-card'
import useAllNotes from '@/hooks/useAllNotes';
import { SavedNote } from '@/types/notes.types';
import { useEffect } from 'react'

const AllNotes = () => {
    const { allSavedNotes, setAllSavedNotes, getAllSavedNotes, error, isPending } = useAllNotes();

    useEffect(() => {
        getAllSavedNotes().then((notes: SavedNote[] | undefined) => {
            setAllSavedNotes(notes || []);
        });
    }, []);

  return (
    <main className='min-h-screen py-12 lg:py-24 container mx-auto'>
         <section className="w-full mt-6">
          {isPending && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allSavedNotes && allSavedNotes.length > 0 && allSavedNotes.map((notes) => (
              <li key={notes.id} className="w-full">
                <NotesCard notes={notes} />
              </li>
            ))}
          </ul>
        </section>
    </main>
  )
}

export default AllNotes
"use client";

import NotesCard from '@/components/notes/notes-card'
import useNotes from '@/hooks/useNotes';
import { SavedNote } from '@/types/notes.types';
import React, { useEffect, useState } from 'react'

const AllNotes = () => {
    const [allSavedNotes, setAllSavedNotes] = useState<SavedNote[]>([]);
    
    const { getAllSavedNotes } = useNotes();

    useEffect(() => {
        getAllSavedNotes().then((notes: SavedNote[] | undefined) => {
            setAllSavedNotes(notes || []);
        });
    }, []);

    if(allSavedNotes.length === 0) {
        return <div>No notes found</div>
    }

  return (
    <main className='min-h-screen py-12 lg:py-24'>
         <section className="w-full mt-6">
          <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allSavedNotes.map((notes) => (
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
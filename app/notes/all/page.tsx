"use client";

import NotesCard from "@/components/common/notes-card";
import BackButton from "@/components/common/back-button";
import { useAllSavedNotesByUserId } from "@/hooks/useAllSavedNotes";
import React, { useEffect, useState } from "react";
import useSavedNotesStore from "@/stores/saved-notes-store";

const AllNotes = () => {
  const [isClient, setIsClient] = useState(false);

  const { loading, error } = useAllSavedNotesByUserId();

  const { allSavedNotes } = useSavedNotesStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <main className="min-h-[95vh] py-20 px-4 container mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <BackButton />
        <h1 className="text-2xl text-primary font-bold">All Saved Notes</h1>
      </div>
      {loading && <p>Loading notes...</p>}
      {error && <p className="py-2 text-center text-red-500">Error: {error}</p>}
      {allSavedNotes && allSavedNotes.length === 0 ? (
        <section className="w-full flex items-center justify-center py-2">
          <h2>You have not saved any notes!</h2>
        </section>
      ) : null}
      {allSavedNotes && allSavedNotes.length > 0 ? (
        <section className="w-full mt-6">
          <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allSavedNotes.map((notes) => (
              <li key={notes.id} className="w-full">
                <NotesCard notes={notes} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
};

export default AllNotes;

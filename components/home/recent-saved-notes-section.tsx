"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import useSavedNotesStore from "@/stores/saved-notes-store";
import { useAllSavedNotesByUserId } from "@/hooks/useAllSavedNotes";
import NotesCard from "../common/notes-card";
import { Save } from "lucide-react";

const RecentSavedNotesSection = () => {
  const [isClient, setIsClient] = useState(false);
  const { allSavedNotes } = useSavedNotesStore();

  useAllSavedNotesByUserId();

  useEffect(() => {
    setIsClient(true); // Mark as client-side
  }, []);

  if (!isClient) return null;

  return (
    <section
      aria-labelledby="recent-saved"
      className="flex max-w-max container mx-auto flex-col gap-4 mt-8"
    >
      <div className="flex items-center justify-center gap-2">
        <Save className="h-5 w-5 text-primary" />
        <h2 id="recent-saved" className="text-center text-2xl font-[700]">
          Recent Saved Notes
        </h2>
      </div>
      <div className="max-w-2xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center justify-items-center  gap-4">
        {allSavedNotes && allSavedNotes.length > 0 ? (
          allSavedNotes?.slice(0, 3)?.map((notes) => {
            return (
              <div
                key={notes.id}
                className={
                  allSavedNotes.slice(0, 3).length === 1 ? "lg:col-start-2" : ""
                }
              >
                <NotesCard key={notes.id} notes={notes} />
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No recent notes available. Create your first note!
          </p>
        )}
      </div>
      <Link
        href={`/notes/all`}
        className="w-max mx-auto lg:ml-auto text-primary font-semibold underline"
      >
        See all notes here
      </Link>{" "}
    </section>
  );
};

export default RecentSavedNotesSection;

"use client";

import NotesCard from "@/components/notes/notes-card";
import useAllNotes from "@/hooks/useAllNotes";
import { SavedNote } from "@/types/notes.types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const AllNotes = () => {
  const { allSavedNotes, setAllSavedNotes, getAllSavedNotes, error, isPending } =
    useAllNotes();

  useEffect(() => {
    getAllSavedNotes().then((notes: SavedNote[] | undefined) => {
      setAllSavedNotes(notes || []);
    });
  }, []);

  return (
    <main className="min-h-screen pt-24 md:pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </Button>
        </div>

        <header className="mt-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            All saved notes
          </h1>
          <p className="text-muted-foreground mt-1">
            Access your previously generated notes.
          </p>
        </header>

        <section className="w-full">
          {isPending && (
            <div className="text-sm text-muted-foreground">Loading…</div>
          )}
          {error && <div className="text-sm text-destructive">Error: {error}</div>}
          {allSavedNotes && allSavedNotes.length === 0 && !isPending && (
            <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
              No saved notes yet. Generate your first set of notes from a YouTube
              lecture.
            </div>
          )}
          <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allSavedNotes &&
              allSavedNotes.length > 0 &&
              allSavedNotes.map((notes) => (
                <li key={notes.id} className="w-full">
                  <NotesCard notes={notes} />
                </li>
              ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default AllNotes;
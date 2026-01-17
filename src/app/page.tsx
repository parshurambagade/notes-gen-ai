"use client";

import NotesGeneratorForm from "@/components/notes/notes-generator-form";
import NotesLoading from "@/components/notes/notes-loading";
import { Activity, useState } from "react";
import Notes from "@/components/notes/notes";
import { useGlobalStore } from "@/stores/global-store";
import ReplaceNotesAlert from "@/components/notes/replace-notes-alert";
import useNotes from "@/hooks/useNotes";

const Home = () => {
  const { openReplaceNotesAlert, setOpenReplaceNotesAlert } = useNotes();
  const { isFetchingVideoData, isGenerating, videoData, notes } =
    useGlobalStore();

  return (
    <main className="flex flex-col gap-8 items-center justify-center min-h-[95vh] px-3 md:px-6 py-24 lg:py-48">
      <section
        aria-label="Hero section"
        className="flex flex-col gap-4 items-center justify-center max-w-xl w-full"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl leading-10 font-bold text-primary text-center">
            NotesGen AI
          </h1>
          <p className="text-xl leading-6 font-normal text-center">
            Generate Notes From YouTube Lectures
          </p>
        </div>

        {/* NOTES GENERATOR FORM */}
        <section aria-label="Notes generator" className="max-w-xl w-full">
          <NotesGeneratorForm />
        </section>
      </section>

      {/* GENERATED NOTES */}
      <section aria-label="Generated Notes" className="max-w-4xl w-full">
        <Activity
          mode={isFetchingVideoData || isGenerating ? "visible" : "hidden"}
        >
          <NotesLoading videoData={videoData || undefined} />
        </Activity>
        <Activity
          mode={
            notes &&
            Object.keys(notes).length > 0 &&
            (!isFetchingVideoData || !isGenerating)
              ? "visible"
              : "hidden"
          }
        >
          <Notes notes={notes } videoData={videoData || null} />
        </Activity>
      </section>
      <ReplaceNotesAlert
        open={openReplaceNotesAlert}
        setOpen={setOpenReplaceNotesAlert}
        onReplaceNotes={() => {}}
      />
    </main>
  );
};

export default Home;

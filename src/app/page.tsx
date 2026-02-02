"use client";

import NotesGeneratorForm from "@/components/notes/notes-generator-form";
import NotesLoading from "@/components/notes/notes-loading";
import { Activity } from "react";
import Notes from "@/components/notes/notes";
import { useGlobalStore } from "@/stores/global-store";
import ReplaceNotesAlert from "@/components/notes/replace-notes-alert";
import useNotes from "@/hooks/useNotes";
import { LoginRequiredPopup } from "@/components/popups/login-required";

const Home = () => {
  const { openReplaceNotesAlert, setOpenReplaceNotesAlert } = useNotes();
  const { isFetchingVideoData, isGenerating, videoData, notes, showLoginPopup, setShowLoginPopup } =
    useGlobalStore();

  return (
    <main className="min-h-screen pt-24 md:pt-28 pb-20">
      <section
        aria-label="Hero section"
        className="container mx-auto px-4 md:px-6 h-full mt-24 flex flex-col  items-center justify-center"
      >
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Notes from any lecture
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Turn YouTube lectures into clear study notes
          </h1>
          <p className="text-lg text-muted-foreground">
            Paste a link, generate structured notes, and save them for later.
          </p>
        </div>

        {/* NOTES GENERATOR FORM */}
        <section
          aria-label="Notes generator"
          className="max-w-2xl w-full mx-auto mt-8"
        >
          <div className="rounded-2xl border bg-card shadow-sm p-4 md:p-6">
            <NotesGeneratorForm />
          </div>
        </section>
      </section>

      {/* GENERATED NOTES */}
      <section
        aria-label="Generated Notes"
        className="container mx-auto px-4 md:px-6 mt-12"
      >
        <Activity
          mode={isFetchingVideoData || isGenerating ? "visible" : "hidden"}
        >
          <NotesLoading videoData={videoData || undefined} />
        </Activity>
        <Activity
          mode={
            notes &&
              Object.keys(notes).length > 0 &&
              (!isFetchingVideoData && !isGenerating)
              ? "visible"
              : "hidden"
          }
        >
          <Notes notes={notes} videoData={videoData || null} />
        </Activity>
      </section>
      <ReplaceNotesAlert
        open={openReplaceNotesAlert}
        setOpen={setOpenReplaceNotesAlert}
        onReplaceNotes={() => { }}
      />
      <LoginRequiredPopup
        open={showLoginPopup}
        setOpen={setShowLoginPopup}
      />
    </main>
  );
};

export default Home;

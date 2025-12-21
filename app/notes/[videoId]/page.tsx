"use client";

import Notes from "@/components/notes/index";
import NotesLoading from "@/components/notes/notes-loading";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { NotesData, VideoData } from "@/types";
import GenerateNotesErrorComponent from "@/components/notes/generate-notes-error-component";
import { useSavedNotesByVideoId } from "@/hooks/useSavedNotesByVideoId";
import BackButton from "@/components/common/back-button";
import { Suspense } from "react";

// Extract the data-fetching logic into a separate component
const NotesContent = () => {
  const { videoId } = useParams();

  const {
    savedNotes,
    loading: notesLoading,
    error: notesError,
    refetch: refetchNotes,
  } = useSavedNotesByVideoId(videoId as string);

  // Extract video data and notes from saved note
  const videoData = savedNotes
    ? {
        title: savedNotes.video_title,
        videoId: savedNotes.video_id,
        duration: savedNotes.video_duration,
        channel: savedNotes.video_channel,
        thumbnailUrl: savedNotes.video_thumbnail_url,
      }
    : null;

  let notes = savedNotes?.content || null;
  notes = typeof notes === "string" ? JSON.parse(notes) : notes;

  if (notesLoading) {
    return <NotesLoading videoData={videoData || undefined} />;
  }

  if (notesError && !notesLoading) {
    return (
      <GenerateNotesErrorComponent
        videoError={null}
        notesError={notesError}
        refetchNotes={refetchNotes}
        refetchVideo={() => {}}
      />
    );
  }

  if (!savedNotes && !notesLoading && !notesError) {
    return (
      <section className="text-center py-8 min-h-[95vh]">
        <h1 className="text-2xl font-bold mb-4">Notes not found</h1>
        <p className="text-gray-600">
          The requested notes could not be found or you don&apos;t have
          permission to view them.
        </p>
      </section>
    );
  }

  if ((!videoData || !notes) && !notesLoading) {
    return (
      <section className="text-center py-8 min-h-[95vh]">
        Invalid notes data
      </section>
    );
  }

  return (
    <Notes>
      <Notes.Head>
        <Notes.VideoHead
          videoData={videoData as VideoData}
          notes={notes as NotesData}
        />
        <Notes.VideoPlayer
          title={videoData?.title || ""}
          videoId={videoData?.videoId || ""}
        />
      </Notes.Head>
      <Notes.Body>
        {notes?.summary && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Summary</h2>
              <p className="text-gray-700">{notes.summary}</p>
            </div>
            <Separator className="my-8" />
          </>
        )}
        <Notes.KeyPoints keyPoints={notes?.keyPoints || []} />
        <Separator className="my-8" />
        <Notes.DetailedNotes sections={notes?.sections || []} />
      </Notes.Body>
    </Notes>
  );
};

const NotesPage = () => {
  return (
    <main className="min-h-[95vh] py-20 px-2 md:px-4 container mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <BackButton />
      </div>
      <Suspense fallback={<NotesLoading />}>
        <NotesContent />
      </Suspense>
    </main>
  );
};

export default NotesPage;

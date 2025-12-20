"use client";

import Notes from "@/components/notes/index";
import NotesLoading from "@/components/notes/notes-loading";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { NotesData, VideoData } from "@/types";
import GenerateNotesErrorComponent from "@/components/notes/generate-notes-error-component";
import { useSavedNotesByVideoId } from "@/hooks/useSavedNotesByVideoId";
import BackButton from "@/components/common/back-button";

const NotesPage = () => {
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

  const notes = savedNotes?.content || null;

  return (
    <main className="min-h-[95vh] py-20 px-2 md:px-4 container mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <BackButton />
      </div>

      {notesLoading && <NotesLoading videoData={videoData || undefined} />}

      {notesError && !notesLoading && (
        <GenerateNotesErrorComponent
          videoError={null}
          notesError={notesError}
          refetchNotes={refetchNotes}
          refetchVideo={() => {}} // No video refetch needed for saved notes
        />
      )}

      {!savedNotes && !notesLoading && !notesError && (
        <section className="text-center py-8 min-h-[95vh]">
          <h1 className="text-2xl font-bold mb-4">Notes not found</h1>
          <p className="text-gray-600">
            The requested notes could not be found or you don&apos;t have
            permission to view them.
          </p>
        </section>
      )}

      {(!videoData || !notes) && !notesLoading && (
        <section className="text-center py-8 min-h-[95vh]">
          Invalid notes data
        </section>
      )}

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
    </main>
  );
};

export default NotesPage;

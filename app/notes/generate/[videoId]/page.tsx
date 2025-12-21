"use client";

import Notes from "@/components/notes/index";
import NotesLoading from "@/components/notes/notes-loading";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { useVideoData } from "@/hooks/useVideoData";
import { NotesData, NoteSection, VideoData } from "@/types";
import { useNotesGenerator } from "@/hooks/useNotesGenerator";
import GenerateNotesErrorComponent from "@/components/notes/generate-notes-error-component";
import BackButton from "@/components/common/back-button";
import { Suspense } from "react";

const GenerateContent = () => {
  const { videoId } = useParams();

  const {
    videoData,
    loading: videoLoading,
    error: videoError,
    refetch: refetchVideo,
  } = useVideoData(videoId);

  const {
    notes,
    loading: notesLoading,
    error: notesError,
    refetch: refetchNotes,
  } = useNotesGenerator(videoId as string, videoData);

  // Show loading state
  if (notesLoading || videoLoading) {
    return <NotesLoading videoData={videoData || undefined} />;
  }

  // Show error state
  if (notesError || videoError) {
    return (
      <GenerateNotesErrorComponent
        videoError={videoError}
        notesError={notesError}
        refetchNotes={refetchNotes}
        refetchVideo={refetchVideo}
      />
    );
  }

  // Show invalid data state
  if (!videoData || !notes) {
    return (
      <section className="text-center py-8 min-h-[95vh]">
        Invalid notes data
      </section>
    );
  }

  // Show the actual notes content
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
        <Notes.DetailedNotes sections={notes?.sections as NoteSection[]} />
      </Notes.Body>
    </Notes>
  );
};

const GeneratePage = () => {
  return (
    <main className="min-h-[95vh] py-20 px-2 md:px-4 container mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <BackButton />
      </div>
      <Suspense fallback={<NotesLoading />}>
        <GenerateContent />
      </Suspense>
    </main>
  );
};

export default GeneratePage;

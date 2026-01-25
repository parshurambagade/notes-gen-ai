import NotesHead from "./notes-head";
import NotesBody from "./notes-body";
import type { Notes } from "@/types/notes.types";
import { VideoData } from "@/types/video.types";
import VideoPlayer from "./video-player";
import MobileNotesHead from "./mobile-notes-head";

const Notes = ({ notes, videoData }: { notes: Notes | null, videoData: VideoData | null }) => {

  if (!notes || !videoData) return null;

  return (
    <section
      id="generated-notes"
      aria-label="Notes section"
      className="w-full"
    >
      <div className="max-w-4xl mx-auto mt-6 gap-3 flex flex-col">
        {/* NOTES HEAD */}
        <div className="hidden md:block">
          <NotesHead videoData={videoData} />
        </div>
        <div className="block md:hidden">
          <MobileNotesHead videoData={videoData} />
        </div>
        {/* VIDEO PLAYER */}
        <VideoPlayer videoData={videoData} />

        {/* NOTES BODY */}
        <NotesBody notes={notes} />
      </div>
    </section>
  );
};

export default Notes;

import NotesHead from "./notes-head";
import NotesBody from "./notes-body";
import type { Notes } from "@/types/notes.types";
import { VideoData } from "@/types/video.types";

const Notes = ({ notes, videoData }: { notes: Notes | null, videoData: VideoData | null }) => {

  if(!notes || !videoData) return null;

  return (
    <section
      id="generated-notes"
      aria-label="Notes section"
      className=" min-h-[95vh]"
    >
      <div className="max-w-4xl mx-auto">
        {/* NOTES HEAD */}
        <NotesHead videoData={videoData} />
        {/* NOTES BODY */}
        <NotesBody notes={notes} />
      </div>
    </section>
  );
};

export default Notes;

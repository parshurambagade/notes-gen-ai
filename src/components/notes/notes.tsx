import { useGlobalStore } from "@/stores/global-store";
import NotesHead from "./notes-head";
import NotesBody from "./notes-body";

const Notes = () => {
  const { videoData, notes } = useGlobalStore();
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

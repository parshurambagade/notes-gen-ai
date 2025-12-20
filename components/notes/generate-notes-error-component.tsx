import { GenerateNotesErrorComponentProps } from "@/types";

const GenerateNotesErrorComponent = ({
  videoError,
  notesError,
  refetchNotes,
  refetchVideo,
}: GenerateNotesErrorComponentProps) => {
  return (
    <section className="max-w-2xl w-full mx-auto px-2 md:px-4 min-h-[95vh]">
      <div className="text-center bg-red-50 border border-red-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-red-800 mb-2">
          Something went wrong
        </h2>
        <p className="text-red-600 mb-4">{videoError || notesError}</p>
        <button
          onClick={() => {
            refetchVideo();
            refetchNotes();
          }}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </section>
  );
};

export default GenerateNotesErrorComponent;

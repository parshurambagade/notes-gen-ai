import NotesGeneratorForm from "@/components/notes/notes-generator-form";

interface NotesGeneratorProps {
  onNavigate?: (videoId: string) => void;
}

const NotesGenerator = ({ onNavigate }: NotesGeneratorProps) => {
  return (
    <section aria-label="Notes generator" className="max-w-xl w-full">
      <NotesGeneratorForm onNavigate={onNavigate} />
    </section>
  );
};

export default NotesGenerator;

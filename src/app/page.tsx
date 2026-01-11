import NotesGeneratorForm from "@/components/notes/notes-generator-form";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 items-center justify-center min-h-[95vh] px-3 md:px-6 py-24 lg:py-48">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl leading-10 font-bold text-primary text-center">
          NotesGen AI
        </h1>
        <p className="text-xl leading-6 font-normal text-center">
          Generate Notes From YouTube Lectures
        </p>
      </div>
      <section aria-label="Notes generator" className="max-w-xl w-full">
        <NotesGeneratorForm />
      </section>
    </main>
  );
}

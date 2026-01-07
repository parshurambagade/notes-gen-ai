"use server";

import NotesLoading from "@/components/notes/notes-loading";
import BackButton from "@/components/common/back-button";
import { Suspense } from "react";
import GenerateContent from "./generate-content";

interface GeneratePageProps {
  params: Promise<{ videoId: string }>;
}

const GeneratePage = async ({ params }: GeneratePageProps) => {
  const { videoId } = (await params) as { videoId: string };
  // Validate videoId before proceeding
  if (!videoId || typeof videoId !== "string") {
    return (
      <main className="min-h-[95vh] py-20 px-2 md:px-4 container mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <BackButton />
        </div>
        <section className="text-center py-8 min-h-[95vh]">
          <h1 className="text-2xl font-bold mb-4">Invalid Video ID</h1>
          <p className="text-gray-600">
            Please provide a valid YouTube video ID.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[95vh] py-20 px-2 md:px-4 container mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <BackButton />
      </div>
      <Suspense fallback={<NotesLoading />}>
        <GenerateContent videoId={videoId} />
      </Suspense>
    </main>
  );
};

export default GeneratePage;

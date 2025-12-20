"use client";
import React from "react";
import NotesGenerator from "@/components/home/notes-generator";
import RecentSavedNotesSection from "@/components/home/recent-saved-notes-section";
import RecentlyGeneratedSection from "@/components/home/recently-generated-section";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 items-center justify-center min-h-[95vh] px-3 md:px-6 py-24 lg:py-48">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl leading-10 font-[700] text-primary text-center">
          NotesGen AI
        </h1>
        <p className="text-xl leading-6 font-normal text-center">
          Generate Notes From YouTube Lectures
        </p>
      </div>
      <NotesGenerator />
      <RecentSavedNotesSection />
      <RecentlyGeneratedSection />
    </main>
  );
}

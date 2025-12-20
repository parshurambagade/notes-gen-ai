"use client";

import React from "react";
import NotesGeneratorForm from "./notes-generator-form";
import type { NotesGeneratorProps } from "@/types";

const NotesGenerator: React.FC<NotesGeneratorProps> = ({ onNavigate }) => {
  return (
    <section aria-label="Notes generator" className="max-w-xl w-full">
      <NotesGeneratorForm onNavigate={onNavigate} />
    </section>
  );
};

export default NotesGenerator;

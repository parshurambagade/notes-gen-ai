"use client";

import { SavedNote } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SavedNotesState {
  allSavedNotes: SavedNote[];
  addAllSavedNotes: (allSavedNotes: SavedNote[]) => void;
  saveOneNotes: (notes: SavedNote) => void;
  removeSavedNotes: (videoId: string) => void;
  clearSavedNotes: () => void;
}

const useSavedNotesStore = create<SavedNotesState>()(
  devtools((set) => ({
    allSavedNotes: [],

    addAllSavedNotes: (allSavedNotes: SavedNote[]) =>
      set((state) => ({
        allSavedNotes: [...allSavedNotes] as SavedNote[],
      })),

    saveOneNotes: (notes: SavedNote) =>
      set((state) => ({
        allSavedNotes: [...state.allSavedNotes, notes],
      })),

    removeSavedNotes: (videoId: string) =>
      set((state) => ({
        allSavedNotes: state.allSavedNotes.filter(
          (notes) => notes.video_id !== videoId
        ),
      })),

    clearSavedNotes: () => set({ allSavedNotes: [] }),
  }))
);

export default useSavedNotesStore;

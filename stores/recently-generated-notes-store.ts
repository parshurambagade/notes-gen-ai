"use client";

import { NotesData, VideoData } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Interface for a recently generated note entry
export interface RecentlyGeneratedNote {
  videoId: string;
  videoData: VideoData | null;
  notesData: NotesData;
  generatedAt: number; // timestamp
}

interface RecentlyGeneratedNotesState {
  recentlyGeneratedNotes: RecentlyGeneratedNote[];
  cacheHits: number;
  cacheMisses: number;

  // Get cached notes for a specific video ID
  getCachedNotes: (videoId: string) => RecentlyGeneratedNote | null;

  // Add a newly generated note to the cache
  addGeneratedNote: (
    videoId: string,
    notesData: NotesData,
    videoData?: VideoData | null
  ) => void;

  // Remove a specific note from cache
  removeGeneratedNote: (videoId: string) => void;

  // Clear all cached notes
  clearGeneratedNotes: () => void;

  // Check if notes exist for a video ID
  hasGeneratedNotes: (videoId: string) => boolean;

  // Get all cached notes (for debugging or display)
  getAllGeneratedNotes: () => RecentlyGeneratedNote[];

  // Clean up old entries (older than 24 hours)
  cleanupOldEntries: () => void;

  // Cache statistics
  getCacheStats: () => { hits: number; misses: number; hitRate: string };
  resetCacheStats: () => void;
}

const CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const useRecentlyGeneratedNotesStore = create<RecentlyGeneratedNotesState>()(
  devtools(
    (set, get) => ({
      recentlyGeneratedNotes: [],
      cacheHits: 0,
      cacheMisses: 0,

      getCachedNotes: (videoId: string) => {
        const state = get();
        const cachedNote = state.recentlyGeneratedNotes.find(
          (note) => note.videoId === videoId
        );

        if (cachedNote) {
          // Check if the cached note is still valid (not expired)
          const isExpired =
            Date.now() - cachedNote.generatedAt > CACHE_EXPIRY_TIME;
          if (isExpired) {
            // Remove expired entry and count as cache miss
            state.removeGeneratedNote(videoId);
            set((state) => ({ cacheMisses: state.cacheMisses + 1 }));
            return null;
          }
          // Cache hit - increment counter and return cached note
          set((state) => ({ cacheHits: state.cacheHits + 1 }));
          return cachedNote;
        }

        // Cache miss - no entry found
        set((state) => ({ cacheMisses: state.cacheMisses + 1 }));
        return null;
      },

      addGeneratedNote: (
        videoId: string,
        notesData: NotesData,
        videoData = null
      ) => {
        set((state) => {
          // Remove existing entry if it exists
          const filteredNotes = state.recentlyGeneratedNotes.filter(
            (note) => note.videoId !== videoId
          );

          // Add new entry at the beginning
          const newNote: RecentlyGeneratedNote = {
            videoId,
            videoData,
            notesData,
            generatedAt: Date.now(),
          };

          // Keep only the last 50 entries to prevent unlimited growth
          const updatedNotes = [newNote, ...filteredNotes].slice(0, 50);

          return {
            recentlyGeneratedNotes: updatedNotes,
          };
        });
      },

      removeGeneratedNote: (videoId: string) => {
        set((state) => ({
          recentlyGeneratedNotes: state.recentlyGeneratedNotes.filter(
            (note) => note.videoId !== videoId
          ),
        }));
      },

      clearGeneratedNotes: () => {
        set({ recentlyGeneratedNotes: [] });
      },

      hasGeneratedNotes: (videoId: string) => {
        const state = get();
        return state.getCachedNotes(videoId) !== null;
      },

      getAllGeneratedNotes: () => {
        return get().recentlyGeneratedNotes;
      },

      cleanupOldEntries: () => {
        set((state) => {
          const now = Date.now();
          const validNotes = state.recentlyGeneratedNotes.filter(
            (note) => now - note.generatedAt <= CACHE_EXPIRY_TIME
          );

          return {
            recentlyGeneratedNotes: validNotes,
          };
        });
      },

      getCacheStats: () => {
        const state = get();
        const totalRequests = state.cacheHits + state.cacheMisses;
        const hitRate =
          totalRequests === 0 ? 0 : (state.cacheHits / totalRequests) * 100;

        return {
          hits: state.cacheHits,
          misses: state.cacheMisses,
          hitRate: `${hitRate.toFixed(2)}%`,
        };
      },

      resetCacheStats: () => {
        set({ cacheHits: 0, cacheMisses: 0 });
      },
    }),
    {
      name: "recently-generated-notes-store",
    }
  )
);

export default useRecentlyGeneratedNotesStore;

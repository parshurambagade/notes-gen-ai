import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { GlobalState, GlobalStore } from "@/types/store.types";

const initialState: GlobalState = {
  url: "https://youtu.be/lsf060bLH_Y?si=WN_YYbuxcLwaRSHq",
  videoId: "",
  notes: null,
  videoData: null,
  error: "",
  isGenerating: false,
  isFetchingVideoData: false,
};

export const useGlobalStore = create<GlobalStore>()(
  devtools(
    (set) => ({
      ...initialState,
      setUrl: (url) => set({ url }),
      setVideoId: (videoId) => set({ videoId }),
      setNotes: (notes) => set({ notes }),
      setVideoData: (videoData) => set({ videoData }),
      setError: (error: string) => set({ error }),
      setIsGenerating: (isGenerating: boolean) => set({ isGenerating }),
      setIsFetchingVideoData: (isFetchingVideoData: boolean) =>
        set({ isFetchingVideoData }),
    }),
    { name: "global-store" }
  )
);

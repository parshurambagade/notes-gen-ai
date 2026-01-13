import { Notes } from "./notes.types";
import { VideoData } from "./video.types";

export interface GlobalState {
  url: string;
  videoId: string;
  notes: Notes | null;
  videoData: VideoData | null;
  error: string;
  isGenerating: boolean;
  isFetchingVideoData: boolean;
}

export interface GlobalActions {
  setUrl: (url: string) => void;
  setVideoId: (videoId: string) => void;
  setNotes: (notes: Notes) => void;
  setVideoData: (videoData: VideoData) => void;
  setError: (error: string) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setIsFetchingVideoData: (isFetchingVideoData: boolean) => void;
  clearStore: () => void;
}

export interface GlobalStore extends GlobalState, GlobalActions {}

// Hook-related type definitions

import { NotesData } from "./components";
import { VideoData } from "./video";

export interface UseYouTubeVideoIdReturn {
  videoId: string;
  error: boolean;
  isValidVideoId: boolean;
}

export interface UseVideoDataReturn {
  videoData: VideoData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface UseVideoTranscriptReturn {
  transcript: string;
  loading: boolean;
  error: string | null;
}

export interface UseNotesGeneratorFormProps {
  url: string;
  onNavigate?: (videoId: string) => void;
}

export interface UseNotesGeneratorFormReturn {
  videoId: string;
  error: boolean;
  isValidVideoId: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
export interface UseNotesGeneratorProps {
  notes: NotesData | null;
  loading: boolean;
  error: string | null;
  generateNotes: (videoId: string) => Promise<void>;
  refetch: () => Promise<void>;
}
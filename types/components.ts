// Component-related type definitions

import type { VideoData } from "./video";

export interface NotesGeneratorProps {
  onNavigate?: (videoId: string) => void;
}

export interface NotesGeneratorFormProps {
  onNavigate?: (videoId: string) => void;
}

export interface NotesVideoHeadProps {
  videoData: VideoData;
  notes: NotesData;
}
export interface NotesHeadButtonsProps {
  videoData: VideoData | null;
  notes: NotesData | null;
}
// Notes content types
export interface NoteSection {
  title: string;
  content: string;
  subsections?: { subTopicTitle: string; content: string }[];
  timestamp: string;
}

export interface NotesData {
  summary: string;
  keyPoints: string[];
  sections: NoteSection[];
}

export interface KeyPointsProps {
  keyPoints: string[];
}

export interface DetailedNotesProps {
  sections: NoteSection[];
}

export interface VideoPlayerProps {
  title: string;
  videoId: string;
}

// Composition types for Notes component
export interface NotesComponent {
  Head: React.ComponentType<React.PropsWithChildren>;
  Body: React.ComponentType<React.PropsWithChildren>;
  KeyPoints: React.ComponentType<KeyPointsProps>;
  DetailedNotes: React.ComponentType<DetailedNotesProps>;
  VideoHead: React.ComponentType<NotesVideoHeadProps>;
  VideoPlayer: React.ComponentType<VideoPlayerProps>;
}

export interface DetailedNotesProps {
  sections: NoteSection[];
}

export interface GenerateNotesErrorComponentProps {
  videoError?: string | null;
  notesError?: string | null;
  refetchNotes: () => void;
  refetchVideo: () => void;
}

export interface SavedNote {
  id: string;
  user_id: string;
  video_id: string;
  video_title: string;
  video_channel: string;
  video_duration: string;
  video_thumbnail_url: string;
  content: NotesData;
  created_at: string;
  updated_at: string;
}

// Video-related type definitions

export interface VideoData {
  title: string;
  videoId: string;
  duration: string;
  channel: string;
  thumbnailUrl?: string;
}

export interface VideoApiResponse {
  title: string;
  duration: string;
  channel: string;
  error?: string;
  thumbnailUrl?: string;
}

export interface VideoDetails {
  title: string;
  videoId: string;
  duration: string;
  channel: string;
}

// YouTube transcript types
export interface TranscriptItem {
  text: string;
  start: number;
  dur: number;
}

export interface TranscriptTrack {
  transcript: TranscriptItem[];
}

export interface TranscriptResponse {
  tracks: TranscriptTrack[];
}

export interface TranscriptApiResponse {
  videoId: string;
  transcript: string;
  rawTranscript: TranscriptItem[];
}
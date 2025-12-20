// API-related type definitions

// Next.js API route parameter types
export interface VideoRouteParams {
  params: Promise<{ videoId: string }>;
}

export interface TranscriptRouteParams {
  params: Promise<{ videoId: string }>;
}

// API response types
export interface ApiErrorResponse {
  error: string;
}

export interface ApiSuccessResponse<T> {
  data: T;
  message?: string;
}

// YouTube API response types
export interface YouTubeVideoSnippet {
  title: string;
  channelTitle: string;
  description: string;
  publishedAt: string;
}

export interface YouTubeVideoContentDetails {
  duration: string;
}

export interface YouTubeVideoItem {
  snippet: YouTubeVideoSnippet;
  contentDetails: YouTubeVideoContentDetails;
}

export interface YouTubeApiResponse {
  items: YouTubeVideoItem[];
}
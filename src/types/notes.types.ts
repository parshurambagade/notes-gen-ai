export interface NoteSection {
  title: string;
  content: string;
  subsections?: { subTopicTitle: string; content: string }[];
  timestamp: string;
}

export interface Notes {
  summary: string;
  keyPoints: string[];
  sections: NoteSection[];
}

export interface SavedNote {
  id: string;
  user_id: string;
  video_id: string;
  video_title: string;
  video_channel: string;
  video_duration: string;
  video_thumbnail_url: string;
  content: Notes;
  created_at: string;
  updated_at: string;
}

/**
 * Extracts YouTube video ID from various YouTube URL formats
 * @param url - The YouTube URL to parse
 * @returns The video ID if valid, null otherwise
 */
export const parseYouTubeUrl = (url: string): string | null => {
  if (!url.trim()) {
    return null;
  }

  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);

  return match && match[1] && match[1].length === 11 ? match[1] : null;
};

/**
 * Extracts YouTube video ID from various YouTube URL formats
 * Supports: watch, embed, v, shorts, youtu.be, and mobile URLs
 * @param url - The YouTube URL to parse
 * @returns The video ID if valid, null otherwise
 */
export const extractYouTubeVideoId = (url: string): string | null => {
  if (!url || typeof url !== "string" || !url.trim()) {
    return null;
  }

  // Comprehensive regex that matches all YouTube URL formats
  const patterns = [
    // youtube.com/watch?v=VIDEO_ID or youtube.com/watch?feature=share&v=VIDEO_ID
    /(?:youtube\.com\/watch\?v=|youtube\.com\/watch\?.*[&?]v=)([a-zA-Z0-9_-]{11})/,
    // youtu.be/VIDEO_ID
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    // youtube.com/embed/VIDEO_ID
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    // youtube.com/v/VIDEO_ID
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    // youtube.com/shorts/VIDEO_ID
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    // m.youtube.com/watch?v=VIDEO_ID
    /m\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

/**
 * Validates if a string is a valid YouTube video ID
 * @param videoId - The video ID to validate
 * @returns True if valid, false otherwise
 */
export const isValidYouTubeVideoId = (videoId: string | null): boolean => {
  if (!videoId || typeof videoId !== "string") {
    return false;
  }
  return videoId.length === 11 && /^[a-zA-Z0-9_-]{11}$/.test(videoId);
};

/**
 * Formats YouTube API duration (ISO 8601 format) to readable string
 * @param duration - Duration in ISO 8601 format (e.g., "PT1H30M45S")
 * @returns Formatted duration string (e.g., "1 Hour 30 Minutes")
 */
export const formatYouTubeDuration = (duration: string): string => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return "Unknown Duration";

  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;

  const parts: string[] = [];

  if (hours) parts.push(`${hours} Hour${hours > 1 ? "s" : ""}`);
  if (minutes) parts.push(`${minutes} Minute${minutes > 1 ? "s" : ""}`);
  if (seconds && !hours && !minutes)
    parts.push(`${seconds} Second${seconds > 1 ? "s" : ""}`);

  return parts.length > 0 ? parts.join(" ") : "0 Minutes";
};

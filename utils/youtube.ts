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
 * Validates if a string is a valid YouTube video ID
 * @param videoId - The video ID to validate
 * @returns True if valid, false otherwise
 */
export const isValidYouTubeVideoId = (videoId: string): boolean => {
  return videoId.length === 11 && /^[a-zA-Z0-9_-]{11}$/.test(videoId);
};

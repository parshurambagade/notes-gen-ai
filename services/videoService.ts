import { formatYouTubeDuration } from "@/utils/time";
import type { VideoData, VideoApiResponse } from "@/types";

export class VideoService {
  static async getVideoDetails(videoId: string): Promise<VideoData> {
    try {
      // Validate input
      if (!videoId || !(videoId.trim().length === 11)) {
        throw new Error('Video ID is required');
      }

      const response = await fetch(`/api/video/${videoId}`);
      
      if (!response.ok) {
        switch (response.status) {
          case 404:
            throw new Error('Video not found');
          case 400:
            throw new Error('Invalid video ID');
          case 500:
            throw new Error('Server error. Please try again later');
          default:
            throw new Error(`Failed to fetch video: ${response.status}`);
        }
      }
      
      const data: VideoApiResponse = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Validate required fields
      if (!data.title || !data.duration || !data.channel || !data.thumbnailUrl ) {
        throw new Error('Incomplete video data received');
      }

      return {
        title: data.title,
        videoId,
        duration: formatYouTubeDuration(data.duration),
        channel: data.channel,
        thumbnailUrl: data.thumbnailUrl,
      };

    } catch (error) {
      console.error('VideoService.getVideoDetails error:', error);
      
      // Re-throw with user-friendly message or preserve original
      if (error instanceof Error) {
        throw error; // Preserve our custom error messages
      }
  
      throw new Error('An unexpected error occurred while fetching video details');
    }
  }
}
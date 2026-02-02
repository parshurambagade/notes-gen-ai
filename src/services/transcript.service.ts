import { Supadata, TranscriptOrJobId, Transcript } from "@supadata/js";

// Initialize the client
const supadata = new Supadata({
  apiKey: process.env.NEXT_SUPADATA_API_KEY || "",
});
export class TranscriptService {
  // Server-side method - direct API call
  static async fetchYouTubeTranscript(videoId: string): Promise<string | null> {
    try {
      // Validate videoId
      if (!videoId || videoId.trim() === "") {
        throw new Error("Video ID is required and cannot be empty");
      }

      const response: TranscriptOrJobId = await supadata.transcript({
        url: `https://www.youtube.com/watch?v=${videoId.trim()}`,
        lang: "en",
        text: true,
        mode: "auto",
      });

      if (response as Transcript) {
        return (response as Transcript)?.content as string;
      } else {
        return null;
      }
    } catch (error: unknown) {
      console.error("Error fetching transcript (server-side):", error);
      throw new Error(
        `Failed to fetch transcript: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
}

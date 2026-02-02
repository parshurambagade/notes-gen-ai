import { Notes } from "@/types/notes.types";
import { convertMarkdownToJson } from "@/lib/notes";

export class NotesService {
  static async generateNotes(videoId: string): Promise<Notes> {
    if (!videoId) {
      throw new Error("Video ID is required to generate notes");
    }

    try {
      const response = await fetch("/api/notes/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId }),
      });

      if (!response.ok) {
        // return error message if available
        const errorText = await response.text();
        if (errorText) {
          throw new Error(`${errorText || "Failed to generate notes"}`);
        }
      }

      const data = await response.json();

      if (!data.notes) {
        throw new Error("No notes data found in response");
      }

      // Convert markdown to JSON
      const json = convertMarkdownToJson(data.notes);

      if (!json) {
        throw new Error("Failed to convert markdown to JSON");
      }

      return json;
    } catch (error) {
      console.error("Error in NotesService.generateNotes:", error);
      // return error message if available, otherwise throw a generic error
      if (error instanceof Error) {
        throw new Error(
          `Failed to generate notes: ${error?.message || "Unknown error"}`
        );
      }
      throw error;
    }
  }
}

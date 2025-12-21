import { NotesData, SavedNote, VideoData } from "@/types";
import { convertMarkdownToJson } from "@/utils/notes";
import { supabase } from "@/lib/supabase/client";

export class NotesService {
  static async generateNotes(videoId: string): Promise<NotesData> {
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

  static async saveNotes(
    videoData: VideoData,
    notesData: NotesData
  ): Promise<SavedNote> {
    try {
      // Get current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("You must be logged in to save notes");
      }

      // Check if notes already exist for this user and video
      const { data: existingNotes, error: checkError } = await supabase
        .from("notes")
        .select("id")
        .eq("user_id", user.id)
        .eq("video_id", videoData.videoId)
        .single();

      if (checkError && checkError.code !== "PGRST116") {
        throw new Error("Error checking existing notes");
      }

      const noteData = {
        user_id: user.id,
        video_id: videoData.videoId,
        video_title: videoData.title,
        video_channel: videoData.channel,
        video_duration: videoData.duration,
        video_thumbnail_url: videoData.thumbnailUrl,
        content: notesData,
        updated_at: new Date().toISOString(),
      };

      if (existingNotes) {
        // Update existing notes
        const { data, error } = await supabase
          .from("notes")
          .update(noteData)
          .eq("id", existingNotes.id)
          .select()
          .single();

        if (error) {
          throw new Error(`Failed to update notes: ${error.message}`);
        }

        return data;
      } else {
        // Create new notes
        const { data, error } = await supabase
          .from("notes")
          .insert({
            ...noteData,
            created_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (error) {
          throw new Error(`Failed to save notes: ${error.message}`);
        }

        return data;
      }
    } catch (error) {
      console.error("NotesService.saveNotes error:", error);
      throw error instanceof Error ? error : new Error("Failed to save notes");
    }
  }

  static async getAllSavedNotes(userId: string): Promise<SavedNote[]> {
    try {
      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch saved notes: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error("NotesService.getSavedNotes error:", error);
      throw error instanceof Error
        ? error
        : new Error("Failed to fetch saved notes");
    }
  }

  static async getNotesByVideoId(
    videoId: string,
    userId: string
  ): Promise<SavedNote | null> {
    try {
      if (!videoId || !(videoId.trim().length === 11)) {
        throw new Error("Notes ID is required");
      }

      const { data, error } = await supabase
        .from("notes")
        .select("*")
        .eq("video_id", videoId)
        .eq("user_id", userId)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // No rows found
          return null;
        }
        throw new Error(`Failed to fetch saved notes: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error("NotesService.getNotesByVideoId error:", error);
      throw error instanceof Error
        ? error
        : new Error("Failed to fetch saved notes");
    }
  }

  static async deleteNotes(videoId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from("notes")
        .delete()
        .eq("video_id", videoId);

      if (error) {
        throw new Error(`Failed to delete note: ${error.message}`);
      }
    } catch (error) {
      console.error("NotesService.deleteSavedNotes error:", error);
      throw error instanceof Error ? error : new Error("Failed to delete note");
    }
  }

  static async checkIfNotesExists(userId: string, videoId: string) {
    try {
      const { data, error } = await supabase
        .from("notes")
        .select("id")
        .eq("user_id", userId)
        .eq("video_id", videoId)
        .single();

      if (error && error.code !== "PGRST116") {
        throw new Error("Error checking note existence");
      }

      return data;
    } catch (error) {
      console.error("NotesService.checkIfNotesExists error:", error);
      return false;
    }
  }
}

"use client";

import { Activity } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useGlobalStore } from "@/stores/global-store";
import {
  extractYouTubeVideoId,
  isValidYouTubeVideoId,
  parseYouTubeUrl,
} from "@/lib/youtube";
import useGenerateNotes from "@/hooks/useGenerateNotes";

const NotesGeneratorForm = () => {
  const { url, setUrl, setError, setVideoId, error } = useGlobalStore();

  const { isGenerating, generateNotes } = useGenerateNotes();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidUrl = parseYouTubeUrl(url);

    if (!isValidUrl) {
      setError("Please enter a valid YouTube URL");
      return;
    }

    const extractedVideoId = extractYouTubeVideoId(url);

    const isValidVideoId = isValidYouTubeVideoId(extractedVideoId);

    if (!isValidVideoId) {
      setError("Video ID is not valid. Please enter a valid YouTube URL");
      return;
    }

    if (isValidVideoId) {
      setVideoId(String(extractedVideoId));
      generateNotes(String(extractedVideoId));
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row w-full items-center gap-3"
        aria-label="YouTube video URL input form"
        autoComplete="off"
      >
        <div className="w-full flex-1">
          <Input
            id="youtube-url"
            aria-label="Youtube video url"
            placeholder="Paste a YouTube URL"
            className="bg-background w-full"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "url-error" : undefined}
          />
        </div>
        <Button
          type="submit"
          disabled={isGenerating}
          className="w-full sm:w-max cursor-pointer"
          aria-label="Generate notes from YouTube video"
        >
          {isGenerating ? "Generating..." : "Generate Notes"}
        </Button>
      </form>

      {/* ERROR MESSAGE */}
      <Activity mode={error && error.length > 0 ? "visible" : "hidden"}>
        <span id="url-error" className="text-destructive text-sm mt-2 block">
          {error}
        </span>
      </Activity>
    </div>
  );
};

export default NotesGeneratorForm;

import { NextResponse } from "next/server";
import type { TranscriptItem, TranscriptRouteParams } from "@/types";
import { YOUTUBE_TRANSCRIPT_API_URL } from "@/constants";

export async function GET(request: Request, { params }: TranscriptRouteParams) {
  try {
    const { videoId } = await params;

    // Validate videoId
    if (!videoId || videoId.trim() === "") {
      return NextResponse.json(
        { error: "Video ID is required" },
        { status: 400 }
      );
    }

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key":
          process.env.NEXT_YOUTUBE_TRANSCRIPT_RAPID_API_KEY || "",
        "x-rapidapi-host":
          process.env.NEXT_YOUTUBE_TRANSCRIPT_RAPID_API_HOST || "",
      },
    };
    const url = `${YOUTUBE_TRANSCRIPT_API_URL}${videoId.trim()}`;
    const response = await fetch(url, options);
    const json = await response.json();
    const result = json?.transcript as TranscriptItem[];

    const formattedTranscript = result
      ?.map((entry: TranscriptItem) => entry.text)
      .join(" ");

    if (!formattedTranscript) {
      return NextResponse.json(
        { error: "No transcript available for this video" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        videoId,
        transcript: formattedTranscript,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching transcript:", error);

    // Return proper error response instead of null
    return NextResponse.json(
      {
        error:
          "Failed to fetch transcript. Video may not have captions available.",
      },
      { status: 500 }
    );
  }
}

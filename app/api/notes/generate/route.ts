import { GEMINI_API_KEY, PROMPT_FOR_NOTES_GENERATION } from "@/constants";
import { TranscriptService } from "@/services/transcriptService";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Get videoId from request body
    const { videoId } = await req.json();

    if (!videoId) {
      return NextResponse.json(
        { error: "Video ID is required" },
        { status: 400 }
      );
    }

    const transcript = await TranscriptService.fetchYouTubeTranscript(videoId);

    if (!transcript || transcript.length === 0) {
      return NextResponse.json(
        { error: "Could not fetch transcript for this video" },
        { status: 404 }
      );
    }

    // Generate notes using AI (uncomment when ready)
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = PROMPT_FOR_NOTES_GENERATION + transcript;

    if (prompt.length > 100000) {
      return NextResponse.json(
        { error: "Video length is too long" },
        { status: 400 }
      );
    }

    const result = await model.generateContent(prompt);
    const notes = await result.response.text();

    if (!notes || notes.trim().length === 0) {
      return NextResponse.json(
        { error: "Failed to generate notes from transcript" },
        { status: 500 }
      );
    }
    return NextResponse.json({
      transcript,
      notes: notes,
      videoId,
    });
  } catch (err) {
    console.error("Error generating notes:", err);
    return NextResponse.json(
      { error: "Failed to generate notes. Please try again later." },
      { status: 500 }
    );
  }
}

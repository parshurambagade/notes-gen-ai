import { NextResponse } from "next/server";
import { GET_VIDEO_DETAILS } from "@/constants";
import { YOUTUBE_API_KEY } from "@/constants";
import type { VideoData, VideoRouteParams } from "@/types";

export async function GET(request: Request, { params }: VideoRouteParams) {
  const { videoId } = await params;

  if (!videoId) {
    return NextResponse.json(
      { error: "Video ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${GET_VIDEO_DETAILS}${videoId}&key=${YOUTUBE_API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch video details");
    }

    const data = await response.json();
    if (!data.items || data.items.length === 0) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }
    const videoDetails: VideoData = {
      title: data.items[0].snippet.title,
      videoId: videoId,
      duration: data.items[0].contentDetails.duration,
      channel: data.items[0].snippet.channelTitle,
      thumbnailUrl: data.items[0].snippet.thumbnails.medium.url,
    };

    return NextResponse.json(videoDetails);
  } catch (error) {
    console.error("Error fetching video details:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

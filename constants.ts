export const GET_VIDEO_DETAILS =
  "https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=";
export const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || "";
export const GEMINI_API_KEY = process.env.NEXT_GEMINI_API_KEY || "";
export const YOUTUBE_VIDEO_URL = "https://www.youtube.com/watch?v=";
export const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed";
export const PROMPT_FOR_NOTES_GENERATION = `You are an experienced content writer and note-making expert. Your task is to generate high-quality, structured notes from the given video transcript. The notes should be well-organized, use simple and clear English, and be suitable for study and quick revision purposes.

Please follow this exact format in your response:

{
  summary: "A short 1–2 sentence overview of the entire video content.",
  keyPoints: [
    "List 4–7 most important takeaways from the video in simple bullet points.",
    "Each point should be concise and informative."
  ],
  sections: [
    {
      title: "Section Title that describes the topic or part of the video",
      content: "A short paragraph explaining this section in simple English.",
      timestamp: "start_time - end_time", 
    },
    {
      title: "Another Section Title",
      content: "Explanation goes here.",
      subsections: [
      {subTopicTitle: "Subtopic Title", content: "Brief explanation of the subtopic."},
      {subTopicTitle: "Another Subtopic Title", content: "Brief explanation of this subtopic."},
      {subTopicTitle: "Another Subtopic Title", content: "subTopicTitle is optional"}
      ],
      timestamp: "start_time - end_time"
    }
      
    }
    // Continue for remaining sections...
  ]
}

Instructions:
- Make sure the notes are detailed and accurate.
- Use simple Indian English suitable for beginners.
- Structure the sections based on the flow of the transcript or timestamps if available.
- Do not miss any important concept or point mentioned in the transcript.
- Follow the JSON structure strictly as shown above.

Here is the transcript:`;

export const NEXTAUTH_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

export const YOUTUBE_TRANSCRIPT_API_URL =
  "https://youtube-transcript3.p.rapidapi.com/api/transcript?videoId=";

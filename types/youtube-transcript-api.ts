declare module "youtube-transcript-api" {
  class TranscriptClient {
    ready: Promise<void>;
    getTranscript(videoId: string): Promise<any>;
  }
  export = TranscriptClient;
}

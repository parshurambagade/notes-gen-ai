import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { VideoData } from "@/types/video.types";
import Image from "next/image";

interface NotesLoadingProps {
  videoData?: VideoData;
}

const NotesLoading = ({ videoData }: NotesLoadingProps) => {
  return (
    <section
      aria-label="Notes loading skeleton"
      className="max-w-4xl w-full mx-auto"
    >
      {/* Video Header */}
      {videoData && (
        <div className="mb-8">
          <Card className="p-6 border-border bg-card">
            <div className="flex gap-4">
              <div className="shrink-0">
                <Image
                  src={videoData?.thumbnailUrl || ""}
                  alt={videoData.title}
                  className="w-32 h-20 object-cover rounded-lg"
                  width={100}
                  height={80}
                />
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-semibold mb-2 line-clamp-2">
                  {videoData.title}
                </h1>
                <p className="text-gray-600">{videoData.channel}</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Loading Content */}
      <div className="space-y-8 border border-border rounded-2xl p-4 md:p-8 bg-card shadow-sm">
        {/* Loading Header with Animation */}
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-muted rounded-full animate-spin">
                <div className="absolute top-1 left-1 w-14 h-14 border-4 border-foreground rounded-full border-t-transparent animate-spin"></div>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Generating Notes
          </h2>
          <p className="text-muted-foreground mb-6">
            AI is analyzing the video transcript and creating comprehensive
            notes for you...
          </p>

          {/* Progress Steps */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span className="text-foreground/80">✓ Fetching transcript</span>
              <span className="text-foreground animate-pulse">
                ● Processing content
              </span>
              <span className="text-muted-foreground">○ Generating notes</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-foreground h-2 rounded-full animate-pulse"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Loading Skeleton for Summary */}
        <div className="space-y-4">
          <div className="h-6 bg-muted rounded w-24 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-4/6 animate-pulse"></div>
          </div>
        </div>

        <Separator />

        {/* Loading Skeleton for Key Points */}
        <div className="space-y-4">
          <div className="h-6 bg-muted rounded w-32 animate-pulse"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-muted rounded-full mt-2 animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded animate-pulse mb-1"></div>
                  <div className="h-4 bg-muted rounded w-4/5 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Loading Skeleton for Detailed Notes */}
        <div className="space-y-6">
          <div className="h-6 bg-muted rounded w-40 animate-pulse"></div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-5 bg-muted rounded w-2/3 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse"></div>
                  <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                </div>
                <div className="h-3 bg-muted/60 rounded w-32 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotesLoading;
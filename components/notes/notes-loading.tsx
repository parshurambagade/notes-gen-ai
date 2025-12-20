import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { VideoData } from "@/types";
import Image from "next/image";

interface NotesLoadingProps {
  videoData?: VideoData;
}

const NotesLoading = ({ videoData }: NotesLoadingProps) => {
  return (
    <section
      aria-label="Notes loading skeleton"
      className="max-w-4xl w-full mx-auto px-2 md:px-4"
    >
      {/* Video Header */}
      {videoData && (
        <div className="mb-8">
          <Card className="p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
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
      <div className="space-y-8 border border-gray-200 rounded-lg p-2 md:p-6 bg-white shadow-sm">
        {/* Loading Header with Animation */}
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin">
                <div className="absolute top-1 left-1 w-14 h-14 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Generating Notes
          </h2>
          <p className="text-gray-600 mb-6">
            AI is analyzing the video transcript and creating comprehensive
            notes for you...
          </p>

          {/* Progress Steps */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span className="text-green-600">✓ Fetching transcript</span>
              <span className="text-blue-600 animate-pulse">
                ● Processing content
              </span>
              <span className="text-gray-400">○ Generating notes</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full animate-pulse"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Loading Skeleton for Summary */}
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
          </div>
        </div>

        <Separator />

        {/* Loading Skeleton for Key Points */}
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Loading Skeleton for Detailed Notes */}
        <div className="space-y-6">
          <div className="h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-5 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
                <div className="h-3 bg-gray-100 rounded w-32 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotesLoading;
